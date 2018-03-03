# This file is automatically created by smallcat
from rest_framework import viewsets
import models, serializers

class CourseViewSet(viewsets.ModelViewSet):
	queryset = models.Course.objects.all()
	serializer_class = serializers.CourseSerializer

class CoursecomponentViewSet(viewsets.ModelViewSet):
	queryset = models.Coursecomponent.objects.all()
	serializer_class = serializers.CoursecomponentSerializer

class GroupsViewSet(viewsets.ModelViewSet):
	queryset = models.Groups.objects.all()
	serializer_class = serializers.GroupsSerializer

class ParticipationViewSet(viewsets.ModelViewSet):
	queryset = models.Participation.objects.all()
	serializer_class = serializers.ParticipationSerializer

class TeacherViewSet(viewsets.ModelViewSet):
	queryset = models.Teacher.objects.all()
	serializer_class = serializers.TeacherSerializer

class Query1ViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = models.Participation.objects.all()
	serializer_class = serializers.Query1Serializer