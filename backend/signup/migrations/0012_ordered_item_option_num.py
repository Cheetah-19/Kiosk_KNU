# Generated by Django 4.2.5 on 2023-11-15 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("signup", "0011_order_order_time"),
    ]

    operations = [
        migrations.AddField(
            model_name="ordered_item",
            name="option_num",
            field=models.IntegerField(null=True),
        ),
    ]