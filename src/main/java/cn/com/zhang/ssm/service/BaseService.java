package cn.com.zhang.ssm.service;

import java.util.List;
import java.util.Map;

/**
 *  基础的业务层接口
 * @param <T> 实体封装类的泛型
 */
public interface BaseService<T> {

    //查询所有数据
    List<T> findAllT() throws Exception;

    /**
     *   根据条件动态分页查询数据
     * @param page 当前页
     * @param limit 每一页数据条数
     * @param t 动态查询的条件
     * @return 迎合layUI中table中分页需要使用的数据
     * @throws Exception
     */
    Map<String,Object> findPageTByPramas(Integer page, Integer limit, T t) throws Exception;

    /**
     *   根据条件查询单个数据
     * @param t  条件参数
     * @return 单个数据
     */
    T findOneByPramas(T t) throws Exception;

    /**
     *   根据条件查询多条数据
     * @param t 查询条件
     * @return 多条数据
     * @throws Exception
     */
    List<T> findManyByPramas(T t) throws Exception;

    /**
     *   根据条件查询数据条数
     * @param t 条件参数对象
     * @return 数据条数
     */
    Integer findCountByPramas(T t) throws Exception;

    /**
     *   根据主键id删除单个数据
     * @param id 主键id
     * @return  删除操作结果
     * @throws Exception
     */
    String removeTById(Integer id) throws Exception;

    /**
     *   根据多个主键id批量删除数据
     * @param ids  多个主键id的数组
     * @return  操作的数据条数
     * @throws Exception
     */
    String removeBatchTByIds(Integer[] ids) throws Exception;

    /**
     *   添加数据
     * @param t 添加的对象
     * @return 添加结果
     * @throws Exception
     */
    String saveT(T t) throws Exception;

    /**
     *   修改数据
     * @param t 修改的对象
     * @return 修改的结果
     * @throws Exception
     */
    String updT(T t) throws Exception;

    /**
     *   动态修改数据
     * @param t 修改的对象
     * @return 修改的结果
     * @throws Exception
     */
    String updByPrimaryKeySelective(T t) throws Exception;

    /**
     *   动态批量修改
     * @param ids 多个主键id数组
     * @param t  修改的内容
     * @return 修改的结果
     * @throws Exception
     */
    String updBatchSelective(Integer[] ids, T t) throws Exception;
}
