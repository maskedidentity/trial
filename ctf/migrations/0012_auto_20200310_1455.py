# Generated by Django 2.2.5 on 2020-03-10 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ctf', '0011_auto_20200310_1324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='sub_time',
            field=models.IntegerField(default=0),
        ),
    ]