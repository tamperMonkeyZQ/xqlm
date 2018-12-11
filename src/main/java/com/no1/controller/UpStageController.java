package com.no1.controller;

import com.no1.domain.Recruit;
import com.no1.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("upStage")
public class UpStageController {

    @Autowired
    RecruitService recruitService;
    @RequestMapping("/upStage.action")
    public String upStage() {
        return "upStage";
    }

    @RequestMapping("/goUpStageLogin.action")
    public String goUpStageLogin(){
        return "login";
    }

    @RequestMapping("/goUpStageReg.action")
    public String goUpStageReg(){
        return "reg";
    }

    @RequestMapping("/goUpStageGetPass.action")
    public String goUpStageGetePass(){
        return "getpass";
    }
    @RequestMapping("/recruit.action")
    public String recruit() {
        return "recruit";
    }
    @ResponseBody
    @RequestMapping(value = "/recruitLoad.action",method = RequestMethod.GET)
    public TableInfo recruitLoad(HttpServletResponse response, @RequestParam(value = "pageNumber") int pageNumber,
                                  @RequestParam(value = "pageSize") int pageSize){
        TableInfo tableInfo = new TableInfo();
        Map<String,Object> page = recruitService.getAll(pageNumber, pageSize);
        tableInfo.setRows((List<Recruit>)page.get("rows"));
        tableInfo.setTotal((long) page.get("total"));
        System.out.println(page.get("total")+"ccccccccc");
        return tableInfo;
    }

    @ResponseBody
    @RequestMapping(value = "/recruitSearch.action",method = RequestMethod.GET)
    public TableInfo recruitSearch(HttpServletResponse response, @RequestParam(value = "pageNumber") int pageNumber,
                                  @RequestParam(value = "pageSize") int pageSize,
                                   @RequestParam(value = "searchVO") String searchVO){
        TableInfo tableInfo = new TableInfo();
        Map<String,Object> page = recruitService.search(pageNumber, pageSize,searchVO);
        tableInfo.setRows((List<Recruit>) page.get("rows"));
        System.out.println(page.get("total")+"ccccccccc");
        tableInfo.setTotal((long) page.get("total"));
        return tableInfo;
    }
    public class TableInfo{
        private long total;
        private List<?> rows;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public List<?> getRows() {
            return rows;
        }

        public void setRows(List<?> rows) {
            this.rows = rows;
        }

        public TableInfo(long total, List<?> rows) {
            this.total = total;
            this.rows = rows;
        }

        public TableInfo() {
        }
    }

}
