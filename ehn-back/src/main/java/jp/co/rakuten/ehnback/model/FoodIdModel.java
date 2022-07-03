package jp.co.rakuten.ehnback.model;

import com.google.gson.JsonElement;

import java.util.List;
import java.util.Map;

public class FoodIdModel {

    private Integer id;
    private String title;
    private Double price;
    private Integer likes;
    private List<String> badges;
    private List<String> importantBadges;
    private String nutrition_widget;
    private String serving_size;
    private Integer numberOfServings;
    private Double spoonacularScore;
    private List<String> breadcrumbs;
    private String generatedText;
    private Integer ingredientCount;
    private List<String> images;

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getLikes() {
        return likes;
    }

    public List<String> getBadges() {
        return badges;
    }

    public List<String> getImportantBadges() {
        return importantBadges;
    }

    public String getNutrition_widget() {
        return nutrition_widget;
    }

    public String getServing_size() {
        return serving_size;
    }

    public Integer getNumberOfServings() {
        return numberOfServings;
    }

    public Double getSpoonacularScore() {
        return spoonacularScore;
    }

    public List<String> getBreadcrumbs() {
        return breadcrumbs;
    }

    public String getGeneratedText() {
        return generatedText;
    }

    public Integer getIngredientCount() {
        return ingredientCount;
    }

    public List<String> getImages() {
        return images;
    }

}
