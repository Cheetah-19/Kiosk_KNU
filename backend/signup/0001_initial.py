# Generated by Django 4.2.5 on 2023-10-01 13:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Allergy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("allergy_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Ingredient",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ingredient_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Menu",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("menu_name", models.CharField(max_length=50)),
                ("menu_pic", models.URLField(max_length=500, null=True)),
                ("menu_price", models.PositiveIntegerField()),
                ("menu_introduction", models.TextField(null=True)),
                ("menu_ingredient", models.ManyToManyField(to="signup.ingredient")),
            ],
        ),
        migrations.CreateModel(
            name="MenuCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("menucategory_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Option",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("option_name", models.CharField(max_length=100)),
                ("option_price", models.PositiveIntegerField()),
                ("option_pic", models.CharField(max_length=500, null=True)),
                ("option_introduction", models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name="OptionCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("optioncategory_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("order_num", models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="Payment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("payment_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Religion",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("religion_type", models.CharField(max_length=50)),
                ("religion_ingredient", models.ManyToManyField(to="signup.ingredient")),
            ],
        ),
        migrations.CreateModel(
            name="Vegetarian",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("vegetarian_name", models.CharField(max_length=50)),
                (
                    "vegetarian_ingredient",
                    models.ManyToManyField(to="signup.ingredient"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user_phonenum", models.CharField(max_length=13, null=True)),
                ("user_name", models.CharField(max_length=50, null=True)),
                (
                    "religion",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="signup.religion",
                    ),
                ),
                (
                    "user_allergy",
                    models.ManyToManyField(blank=True, to="signup.allergy"),
                ),
                (
                    "user_vegetarian",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="signup.vegetarian",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ordered_Item",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "menu",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="signup.menu"
                    ),
                ),
                (
                    "option",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="signup.option"
                    ),
                ),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="signup.order"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="order",
            name="payment",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="signup.payment"
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="signup.user"
            ),
        ),
        migrations.AddField(
            model_name="option",
            name="optioncategory",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="signup.optioncategory",
            ),
        ),
        migrations.AddField(
            model_name="menu",
            name="menu_option",
            field=models.ManyToManyField(to="signup.option"),
        ),
        migrations.AddField(
            model_name="menu",
            name="menucategory",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="signup.menucategory",
            ),
        ),
        migrations.AddField(
            model_name="allergy",
            name="allergy_ingredient",
            field=models.ManyToManyField(to="signup.ingredient"),
        ),
    ]
