# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Course(models.Model):
    code = models.CharField(primary_key=True, max_length=8)
    name = models.CharField(max_length=45)
    language = models.CharField(max_length=3)
    credit = models.IntegerField()

    class Meta:
        db_table = 'Course'


class Coursecomponent(models.Model):
    course_code = models.ForeignKey(Course, models.DO_NOTHING, db_column='Course_code')  # Field name made lowercase.
    teacher_username = models.ForeignKey('Teacher', models.DO_NOTHING, db_column='Teacher_username')  # Field name made lowercase.
    amount = models.IntegerField()
    p1 = models.IntegerField(blank=True, null=True)
    p2 = models.IntegerField(blank=True, null=True)
    p3 = models.IntegerField(blank=True, null=True)
    p4 = models.IntegerField(blank=True, null=True)
    p5 = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'CourseComponent'


class Groups(models.Model):
    code = models.CharField(primary_key=True, max_length=8)
    class_code = models.CharField(max_length=7)
    degree_program = models.CharField(max_length=2)

    class Meta:
        db_table = 'Groups'


class Participation(models.Model):
    course_code = models.ForeignKey(Course, models.DO_NOTHING, db_column='Course_code')  # Field name made lowercase.
    groups_code = models.ForeignKey(Groups, models.DO_NOTHING, db_column='Groups_code')  # Field name made lowercase.

    class Meta:
        db_table = 'Participation'


class Teacher(models.Model):
    username = models.CharField(primary_key=True, max_length=10)
    forename = models.CharField(max_length=45)
    surname = models.CharField(max_length=45)
    email = models.CharField(max_length=45)

    class Meta:
        db_table = 'Teacher'
