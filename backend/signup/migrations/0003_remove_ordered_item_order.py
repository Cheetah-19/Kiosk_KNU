# Generated by Django 4.2.5 on 2023-10-01 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0002_alter_order_order_num'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordered_item',
            name='order',
        ),
    ]