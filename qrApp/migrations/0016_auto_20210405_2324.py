# Generated by Django 3.1.7 on 2021-04-05 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrApp', '0015_auto_20210405_2323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='pin',
            field=models.IntegerField(verbose_name='Pin'),
        ),
    ]
