package cn.com.zhang.ssm.mapper;

import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 *   基础Mapper接口
 * @param <T> 实体封装类的泛型
 */
public interface BaseMapper<T> {

    //根据主键id删除单个数据
    int deleteByPrimaryKey(Integer id) throws Exception;

    //根据多个主键id批量删除数据
    Integer deleteBatchTByIds(@Param("ids") Integer[] ids) throws Exception;

    //添加数据
    int insert(T t) throws Exception;

    //动态添加数据
    int insertSelective(T t) throws Exception;

    //根据主键查询单个数据
    T selectByPrimaryKey(Integer id) throws Exception;

    //查询所有数据
    List<T> selAllT() throws Exception;

    //根据条件查询数据
    List<T> selTByPramas(T t) throws Exception;

    //根据条件查询单个数据
    T selOneByPramas(T t) throws Exception;

    //根据条件查询多条数据
    List<T> selManyByPramas(T t) throws Exception;

    //根据条件查询数据条数
    Integer selCountByPramas(T t) throws Exception;

    //动态修改数据
    int updateByPrimaryKeySelective(T t) throws Exception;

    //修改数据
    int updateByPrimaryKey(T t) throws Exception;

    /**
     *   动态批量修改
     * @param ids 多个主键id数组
     * @param t  修改的内容
     * @return 修改的结果
     * @throws Exception
     */
    Integer updBatchSelective(@Param("ids") Integer[] ids, @Param("t") T t) throws Exception;

}
