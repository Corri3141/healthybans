# Generated by Django 3.0.2 on 2021-01-31 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('qrApp', '0011_userprofile_important_type_disease'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='qr_url',
        ),
        migrations.AddField(
            model_name='qrurl',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='qr_url', to='qrApp.UserProfile'),
        ),
    ]
