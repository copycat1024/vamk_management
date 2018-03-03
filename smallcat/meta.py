from rest_framework.metadata import SimpleMetadata
from collections import OrderedDict
from rest_framework.request import clone_request
from rest_framework import exceptions, serializers
from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.utils.encoding import force_text

class GetMetadata(SimpleMetadata):
	def determine_metadata(self, request, view):
		metadata = OrderedDict()
		metadata['view'] = self.determine_view_meta(view)
		if hasattr(view, 'get_serializer'):
			view.request = clone_request(request, "GET")
			try:
				# Test global permissions
				if hasattr(view, 'check_permissions'):
					view.check_permissions(view.request)
			except (exceptions.APIException, PermissionDenied, Http404):
				pass
			else:
				# If user has appropriate permissions for the view, include
				# appropriate metadata about the fields that should be supplied.
				serializer = view.get_serializer()
				metadata['table'] = self.get_table_info(serializer)
			finally:
				view.request = request

		return metadata

	def determine_view_meta(self, view):
		return OrderedDict([
			('classname'    , view.__class__.__name__),
			('name'         , view.get_view_name()),
			('description'  , view.get_view_description()),
			('allow_methods', view.allowed_methods),
			('renders'      , [renderer.media_type for renderer in view.renderer_classes]),
			('parses'       , [parser.media_type for parser in view.parser_classes]),
		])

	def get_table_info(self, serializer):
		"""
		Given an instance of a serializer, return a dictionary of metadata
		about its fields.
		"""
		model_meta = serializer.Meta.model._meta
		fields = OrderedDict([
			(field_name, self.get_field_info(field)) for field_name, field in serializer.fields.items()
		])
		pk = model_meta.pk.name
		return OrderedDict([
			("pk", pk),
			("fields", fields),
		])

	def get_field_info(self, field):
		"""
		Given an instance of a serializer field, return a dictionary
		of metadata about it.
		"""
		field_info = OrderedDict()
		field_info['type'] = self.label_lookup[field]
		field_info['required'] = getattr(field, 'required', False)
		if field_info['type'] == "field":
			field_info['is_relation'] = True

		attrs = [
			'read_only', 'label', 'help_text',
			'min_length', 'max_length',
			'min_value', 'max_value',
			'primary_key', 'name'
		]

		for attr in attrs:
			value = getattr(field, attr, None)
			if value is not None and value != '':
				field_info[attr] = force_text(value, strings_only=True)

		if getattr(field, 'child', None):
			field_info['child'] = self.get_field_info(field.child)
		elif getattr(field, 'fields', None):
			field_info['children'] = self.get_serializer_info(field)

		if (not field_info.get('read_only') and
			not isinstance(field, (serializers.RelatedField, serializers.ManyRelatedField)) and
				hasattr(field, 'choices')):
			field_info['choices'] = [
				{
					'value': choice_value,
					'display_name': force_text(choice_name, strings_only=True)
				}
				for choice_value, choice_name in field.choices.items()
			]

		return field_info
