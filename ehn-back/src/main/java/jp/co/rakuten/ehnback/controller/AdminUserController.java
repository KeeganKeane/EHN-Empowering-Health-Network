package jp.co.rakuten.ehnback.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.JournalReportWithName;
import jp.co.rakuten.ehnback.entity.ReportedJournalInfo;
import jp.co.rakuten.ehnback.service.FRTService;
import jp.co.rakuten.ehnback.service.JournalPostService;
import jp.co.rakuten.ehnback.service.JournalReportService;
import jp.co.rakuten.ehnback.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminUserController {

    JournalReportService journalReportService;
    FRTService frtService;
    UserService userService;
    JournalPostService journalPostService;

    /**
     * End point to get reports on a specific journal
     *
     * @return List<ReportDto>
     */
    @GetMapping("/getReports/{journalId}")
    public List<JournalReportWithName> getReports(@PathVariable Integer journalId){
        // TODO find another way (SqlResultMapping, ResultTransformer and so on...)
        return journalReportService.getReports(journalId);
    }


    /**
     * End point to get all reported journal
     *
     * @return List<ReportedJournalInfo>
     */
    @GetMapping("/getAllReports")
    public List<ReportedJournalInfo> getAllReports(){
        return journalReportService.getAllReports();
    }


    /**
     * End point to hide journal
     *
     * @param id
     * @return SuccessEntity
     */
    @PostMapping("/hide/{id}")
    public SuccessEntity hideJournal(@PathVariable Integer id){
        return journalReportService.hideJournal(id);
    }

    /**
     * End point to dismiss reports
     *
     * @param id
     * @return
     */
    @PostMapping("/dismissReport/{id}")
    public SuccessEntity dissmissReport(@PathVariable Integer id){
        return journalReportService.dismissReport(id);
    }

    /**
     * End point to add food
     *
     * @param frtDto
     * @return SuccessEntity
     */
    @PostMapping("/addFood")
    public SuccessEntity addFood(@RequestBody FRTDto frtDto){
        // TODO validation
        return frtService.addFood(frtDto);
    }

    /**
     * End point to get list of food requests
     *
     * @return List<FoodRequestDto></FoodRequestDto>
     */
    @GetMapping("/foodRequests")
    public List<FoodRequestDto> getFoodRequests(){
     return frtService.getAllFoodRequests();
    }


    /**
     * End point to hide food
     *
     * @param foodId
     * @return SuccessEntity
     */
    @DeleteMapping("/removeFood/{foodId}")
    public SuccessEntity removeFood(@PathVariable Integer foodId){
        return frtService.removeFood(foodId);
    }

    /**
     * End point to get analytics
     *
     * @return Analytics Dto
     */
    @GetMapping("/analytics")
    public AnalyticsDto analytics(){
        return userService.analytics();
    }

    /**
     * End point to get hided journal list
     *
     * @return
     */
    @GetMapping("/hidedJournals")
    public List<HidedJournalDisplayDto> hidedJournals(){
        return journalPostService.hidedJournals();
    }

    /**
     * Endpoint to get hided journal detail
     *
     * @param journalId
     * @return
     */
    @GetMapping("/hidedJournal/{journalId}")
    public HidedJournalDisplayDto hidedJournal(@PathVariable Integer journalId){
        return journalPostService.hidedJournal(journalId);
    }

    @PatchMapping("/unhideJournal/{journalId}")
    public SuccessEntity unhideJournal(@PathVariable Integer journalId){
        return journalPostService.unhideJournal(journalId);
    }
}
