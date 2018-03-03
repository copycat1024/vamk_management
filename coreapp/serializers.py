# This file is automatically created by smallcat
from rest_framework import serializers
from smallcat.serializers import QuerySerializer
import models

class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Course
		fields = '__all__'

class CoursecomponentSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Coursecomponent
		fields = '__all__'

class GroupsSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Groups
		fields = '__all__'

class ParticipationSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Participation
		fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Teacher
		fields = '__all__'

class Query1Serializer(QuerySerializer):
	class Meta:
		primary_model = models.Participation
