# Generated by Django 3.0.2 on 2021-03-08 15:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrApp', '0013_auto_20210202_0345'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='pin',
            field=models.IntegerField(default=1234, max_length=4, validators=[django.core.validators.MinLengthValidator(4)], verbose_name='Pin'),
            preserve_default=False,
        ),
    ]
