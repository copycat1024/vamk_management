from rest_framework import serializers
from collections import OrderedDict
from rest_framework.utils import model_meta
from sets import Set

class QuerySerializer(serializers.BaseSerializer):
	def _get_relations(self, model):
		ret = Set()
		rela = model_meta.get_field_info(model).relations
		for k in rela:
			ret.add(rela[k].related_model)
		return ret

	def to_representation(self, item):
		ret = OrderedDict()
		primary_model = self.Meta.primary_model
		assert isinstance(item, self.Meta.primary_model), (
			"Serializer %s.%s: item does not match primary_model." %
			(self.__class__.__module__, self.__class__.__name__)
		)

		info = model_meta.get_field_info(primary_model)
		return str(self._get_relations(primary_model))