package jp.co.rakuten.ehnback.model;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigInteger;
import java.util.List;

public class WordSearchResultModel {

    private String type;
    private List<WordSearchFoodModel> products;
    private Integer offset;
    private Integer number;
    private Integer totalProducts;
    private Integer processingTimeMs;
    private BigInteger expires;
    private Boolean isStable;

    public List<WordSearchFoodModel> getFoodList() {
        return products;
    }
}
