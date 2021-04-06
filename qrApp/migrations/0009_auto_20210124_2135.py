# Generated by Django 3.0.2 on 2021-01-24 21:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('qrApp', '0008_auto_20210124_2134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='qr_url',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user', to='qrApp.QrURL'),
        ),
    ]