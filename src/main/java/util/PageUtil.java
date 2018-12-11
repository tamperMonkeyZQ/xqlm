package util;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import util.DBUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PageUtil {

    /**
     * 获取数据总页数
     * @param param 搜索参数
     * @param table 搜索表
     * @param where 搜索范围
     * @param singlepage 一页显示多少条数据
     * @return
     * @throws SQLException
     */
    public static int getPages(Object[] param,String table,String where,int singlepage) throws SQLException {
        int page=0;
        DBUtil db=new DBUtil();
        String sql="select count(*) as c from "+table+" where "+where;
        Object params[]=param;
        db.doPstm(sql, params);
        ResultSet rs = db.getRs();
        while (rs.next()) {
            page = rs.getInt("c");
        }
        rs.close();
        db.closed();
        if (page % singlepage == 0) {
            page = page / singlepage;
        } else {
            page = page / singlepage + 1;
        }
        return page;
    }

    /**
     * 获取数据
     * @param sql sql语句
     * @param params
     * @param data 需要的数据（如number，language）
     * @param currentPage
     * @param totalPage
     * @param jumpPage
     * @return
     * @throws Exception
     */
    public static JSONArray returnData(String sql, Object[] params,Object[] data,
                                                   int currentPage, int totalPage, int jumpPage) throws Exception {
        JSONArray ja=new JSONArray();
        DBUtil db=new DBUtil();
        db.doPstm(sql, params);
        ResultSet rs=db.getRs();
        while(rs.next()){
            JSONObject jo=new JSONObject();
            jo.put("currentPage", currentPage);
            jo.put("totalPage", totalPage);
            jo.put("jumpPage", jumpPage);
            for (int i = 0; i < data.length; i++) {
                jo.put(data[i], rs.getObject((String) data[i]));
            }
            ja.add(jo);
        }
        rs.close();
        db.closed();
        return ja;
    }

    /**
     * 数据分页
     * @param currentPage 当前页
     * @param table 查询表格
     * @param where 查询范围
     * @param param 查询参数
     * @param data 需要的数据（如number，language）
     * @param pages 每页显示的内容
     * @param request
     * @param response
     * @throws Exception
     */
    public static void getPageList(int currentPage,String table,String where,Object[] param,Object[] data, int pages,HttpServletRequest request,HttpServletResponse response) throws Exception {
        JSONArray ja = new JSONArray();//声明一个JSONOArray对象，用于返回数据
        int totalPage = PageUtil.getPages(param,table,where,pages);//获取符合关键字的所有订单的总页数
        //判断当前页数是否为0
        if (currentPage == 0) {
            //查询符合关键字的第一页显示的数据
            String sql = "select * from "+table+" where "+where+" order by id desc limit 0," + pages;
            Object params[] = param;//查询参数
            ja = PageUtil.returnData(sql, params,data, 1, totalPage, 1);//获取返回前台显示的JSONArray数据
        } else {
            String fun = request.getParameter("fun");//获取当前点击的操作按钮
            //点击首页按钮
            if (fun.equals("top")) {
                //查询符合关键字的第一页显示的数据
                String sql = "select * from "+table+" where "+where+" order by id desc limit 0,"
                        + pages;
                Object params[] = param;//查询参数
                ja = PageUtil.returnData(sql, params,data, 1, totalPage, 1);//获取返回前台显示的JSONArray数据
            }
            //点击上一页按钮
            else if (fun.equals("prev")) {
                //查询符合关键字的当前页的上一页的数据
                String sql = "select * from "+table+" where "+where+" order by id desc limit " +
                        (currentPage - 2) * pages + "," + pages;
                Object params[] = param;//查询参数
                ja = PageUtil.returnData(sql, params,data, currentPage - 1, totalPage, currentPage - 1);//获取返回前台显示的JSONArray数据
            }
            //点击下一页按钮
            else if (fun.equals("next")) {
                //查询符合关键字的当前页的下一页的数据
                String sql = "select * from "+table+" where "+where+" order by id desc limit " +
                        (currentPage) * pages + "," + pages;
                Object params[] = param;//查询参数
                ja = PageUtil.returnData(sql, params,data, currentPage + 1, totalPage, currentPage + 1);//获取返回前台显示的JSONArray数据
            }
            //点击尾页按钮
            else if (fun.equals("end")) {
                int endPage = Integer.parseInt(request.getParameter("endPage"));//获取传入的尾页页数
                //查询符合关键字的最后一页的数据
                String sql = "select * from "+table+" where "+where+" order by id desc limit " +
                        (endPage - 1) * pages + "," + pages;
                Object params[] = param;//查询参数
                ja = PageUtil.returnData(sql, params,data, endPage, totalPage, endPage);//获取返回前台显示的JSONArray数据
            }
            //点击跳转按钮
            else {
                int jumpPage = Integer.parseInt(request.getParameter("jumpPage"));//获取跳转的页数
                //查询符合关键字的跳转页的的数据
                String sql = "select * from "+table+" where "+where+" order by id desc limit " +
                        (jumpPage - 1) * pages + "," + pages;
                Object params[] = param;//查询参数
                ja = PageUtil.returnData(sql, params,data, jumpPage, totalPage, jumpPage);//获取返回前台显示的JSONArray数据
            }
        }
        BaseUtil.returnJSONArray(request, response, ja);
    }
}
