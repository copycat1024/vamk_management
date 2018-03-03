import sys, inspect

def makeapp(name):
	try:
		models = inspect.getmembers(__import__(name).models, inspect.isclass)
	except ImportError:
		print "Cannot import %s." % name
		return

	_make_serializer(name, models)
	_make_view(name, models)
	_make_router(name, models)

def _make_serializer(name, models):
	serializer_file = open("%s/serializers.py" % name, "w")
	serializer_file.write("# This file is automatically created by smallcat\n")
	serializer_file.write("from rest_framework import serializers\n")
	serializer_file.write("import models\n")
	
	for model_name, models_class in models:
		serializer_file.write("\n")
		serializer_file.write("class %sSerializer(serializers.ModelSerializer):\n" % model_name)
		serializer_file.write("\tclass Meta:\n")
		serializer_file.write("\t\tmodel = models.%s\n" % model_name)
		serializer_file.write("\t\tfields = '__all__'\n")

	serializer_file.close()

def _make_view(name, models):
	view_file = open("%s/views.py" % name, "w")
	view_file.write("# This file is automatically created by smallcat\n")
	view_file.write("from rest_framework import viewsets\n")
	view_file.write("import models, serializers\n")
	
	for model_name, models_class in models:
		view_file.write("\n")
		view_file.write("class %sViewSet(viewsets.ModelViewSet):\n" % model_name)
		view_file.write("\tqueryset = models.%s.objects.all()\n" % model_name)
		view_file.write("\tserializer_class = serializers.%sSerializer\n" % model_name)

	view_file.close()

def _make_router(name, models):
	router_file = open("%s/router.py" % name, "w")
	router_file.write("# This file is automatically created by smallcat\n")
	router_file.write("from rest_framework import routers\n")	
	router_file.write("import views\n")
	router_file.write("router = routers.DefaultRouter()\n")
	
	for model_name, models_class in models:
		router_file.write("router.register(r'%s', views.%sViewSet)\n" % (model_name.lower(), model_name))

	router_file.close()
