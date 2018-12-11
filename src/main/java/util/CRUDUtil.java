package util;


/**
 * 数据库增删改查操作
 * */
public class CRUDUtil {
	/**
	 * 插入一条数据
	 * @param 表名称，字段名称，预读问号，数据的Object类型数组
	 * */
	public static void insert(String table,String names,String param,Object[] params) throws Exception{
		DBUtil db=new DBUtil();
		String sql="insert into "+table+"("+names+") values("+param+")";
		
		db.doPstm(sql, params);
		db.closed();
	}
	/**
	 * 删除一条数据
	 * @param 表名称，where条件，数据的Object类型数组
	 * */
	public static void delete(String table,String condition,Object[] params ) throws Exception{
		DBUtil db=new DBUtil();
		String sql="delete from "+table+" where "+condition;
		
		db.doPstm(sql, params);
		db.closed();
	}
	/**
	 * 更新数据
	 * @param 表名称，更新语句，where条件，数据的Object类型数组
	 * */
	public static void update(String table,String names,String condition,Object[] params) throws Exception{
		DBUtil db=new DBUtil();
		String sql="update "+table+" set "+names+" where "+condition;
		
		db.doPstm(sql, params);
		db.closed();
	}

}
