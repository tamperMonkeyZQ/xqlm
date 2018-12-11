package util;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * 数据库操作类
 * */
public class DBUtil {
	/**
	 * 与数据库的连接
	 * */
	private Connection con;
	/**
	 * 预查询对象
	 * */
	private PreparedStatement pstm;
	
	
	/**
	 * 数据库连接驱动
	 * */
	private static String className = "org.gjt.mm.mysql.Driver";
	
	

	/**
	 * 加载DBCP配置文件
	 * */
	static {
		try {
			Config.init();
			Class.forName(className);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	/**
	 * 建立数据库连接
	 * */
	public Connection getCon()
	{
		try
		{
			con = DriverManager.getConnection(Config.url, Config.user, Config.password);
		} catch (SQLException e)
		{
			System.out.println("connection");
			con = null;
			e.printStackTrace();
		}
		return con;
	}
	/**
	 * 执行sql语句
	 * */
	public void doPstm(String sql, Object[] params)
	{
		if (sql != null && !sql.equals(""))
		{
			if (params == null)
				params = new Object[0];

			getCon();
			if (con != null)
			{
				try
				{
					System.out.println(sql);
					pstm = con.prepareStatement(sql,
							ResultSet.TYPE_SCROLL_INSENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
					for (int i = 0; i < params.length; i++)
					{
						pstm.setObject(i + 1, params[i]);
					}
					pstm.execute();
				} catch (SQLException e)
				{
					System.out.println("doPstm()");
					e.printStackTrace();
				}
			}
		}
	}
	/**
	 * 获取查询结果
	 * */
	public ResultSet getRs() throws SQLException
	{
		return pstm.getResultSet();
	}

	public int getCount() throws SQLException
	{
		return pstm.getUpdateCount();
	}
	/**
	 * 关闭数据库操作
	 * */
	public void closed()
	{
		try
		{
			if (pstm != null)
				pstm.close();
		} catch (SQLException e)
		{
			
			e.printStackTrace();
		}
		try
		{
			if (con != null)
			{
				con.close();
			}
		} catch (SQLException e)
		{
			
			e.printStackTrace();
		}
	}

}
