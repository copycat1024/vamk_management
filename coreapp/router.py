# This file is automatically created by smallcat
from rest_framework import routers
import views
router = routers.DefaultRouter()
router.register(r'course', views.CourseViewSet)
router.register(r'coursecomponent', views.CoursecomponentViewSet)
router.register(r'groups', views.GroupsViewSet)
router.register(r'participation', views.ParticipationViewSet)
router.register(r'teacher', views.TeacherViewSet)
router.register(r'query1', views.Query1ViewSet, 'query1')
