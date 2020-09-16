package cn.com.zhang.ssm.service.impl;

import cn.com.zhang.ssm.mapper.BaseMapper;
import cn.com.zhang.ssm.mapper.InRoomInfoMapper;
import cn.com.zhang.ssm.mapper.RoomSaleMapper;
import cn.com.zhang.ssm.mapper.RoomsMapper;
import cn.com.zhang.ssm.service.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  基础业务层实现类
 * @param <T> 实体封装类的泛型
 *  由于此时的T泛型还未明确，所以此时的类无法实例化，则不需要加上实例化注解
 */
public class BaseServiceImpl<T> implements BaseService<T> {

    //依赖注入基础的Mapper代理对象
    @Autowired
    protected BaseMapper<T> baseMapper;

    //依赖注入入住信息的Mapper代理对象
    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;

    //依赖注入客房信息的Mapper代理对象
    @Autowired
    protected RoomsMapper roomsMapper;

    //依赖注入消费记录Mapper代理对象
    @Autowired
    protected RoomSaleMapper roomSaleMapper;

    //查询所有数据
    @Override
    public List<T> findAllT() throws Exception {
        return baseMapper.selAllT();
    }

    /**
     *   根据条件动态分页查询数据
     * @param page 当前页
     * @param limit 每一页数据条数
     * @param t 动态查询的条件
     * @return 迎合layUI中table中分页需要使用的数据
     * @throws Exception
     */
    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, T t) throws Exception {
        //新建map集合对象
        Map<String,Object> map = new HashMap<String, Object>();
        //进行分页
        PageHelper.startPage(page,limit);
        //嵌套查询
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selTByPramas(t));
        //往map集合中装入数据，此时map中的key值只能写成count和data
        map.put("count",pageInfo.getTotal());
        map.put("data",pageInfo.getList());
        return map;
    }

    /**
     *   根据条件查询单个数据
     * @param t  条件参数
     * @return 单个数据
     */
    @Override
    public T findOneByPramas(T t) throws Exception {
        return baseMapper.selOneByPramas(t);
    }

    /**
     *   根据条件查询多条数据
     * @param t 查询条件
     * @return 多条数据
     * @throws Exception
     */
    @Override
    public List<T> findManyByPramas(T t) throws Exception {
        return baseMapper.selManyByPramas(t);
    }

    /**
     *   根据条件查询数据条数
     * @param t 条件参数对象
     * @return 数据条数
     */
    @Override
    public Integer findCountByPramas(T t) throws Exception {
        return baseMapper.selCountByPramas(t);
    }

    /**
     *   根据主键id删除单个数据
     * @param id 主键id
     * @return  删除操作结果
     * @throws Exception
     */
    @Override
    public String removeTById(Integer id) throws Exception {
        if(baseMapper.deleteByPrimaryKey(id)>0){
            return "delSuccess";
        }else {
            return "delFail";
        }
    }

    /**
     *   根据多个主键id批量删除数据
     * @param ids  多个主键id的数组
     * @return  操作的数据条数
     * @throws Exception
     */
    @Override
    public String removeBatchTByIds(Integer[] ids) throws Exception {
        if(baseMapper.deleteBatchTByIds(ids)>0){
            return "delBatchSuccess";
        }else {
            return "delBatchFail";
        }
    }

    /**
     *   添加数据
     * @param t 添加的对象
     * @return 添加结果
     * @throws Exception
     */
    @Override
    public String saveT(T t) throws Exception {
        if(baseMapper.insert(t)>0){
            return "saveSuccess";
        }else {
            return "saveFail";
        }
    }

    /**
     *   修改数据
     * @param t 修改的对象
     * @return 修改的结果
     * @throws Exception
     */
    @Override
    public String updT(T t) throws Exception {
        if(baseMapper.updateByPrimaryKey(t)>0){
            return "updSuccess";
        }else {
            return "updFail";
        }
    }

    /**
     *   动态修改数据
     * @param t 修改的对象
     * @return 修改的结果
     * @throws Exception
     */
    @Override
    public String updByPrimaryKeySelective(T t) throws Exception {
        if(baseMapper.updateByPrimaryKeySelective(t)>0){
            return "updSuccess";
        }else {
            return "updFail";
        }
    }

    /**
     *   动态批量修改
     * @param ids 多个主键id数组
     * @param t  修改的内容
     * @return 修改的结果
     * @throws Exception
     */
    @Override
    public String updBatchSelective(Integer[] ids, T t) throws Exception {
        if(baseMapper.updBatchSelective(ids,t)>0){
            return "updSuccess";
        }else {
            return "updFail";
        }
    }
}
