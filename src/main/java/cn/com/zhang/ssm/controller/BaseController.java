package cn.com.zhang.ssm.controller;

import cn.com.zhang.ssm.service.BaseService;
import cn.com.zhang.ssm.service.OrderService;
import cn.com.zhang.ssm.service.RoomSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 *  基础控制器层
 * @param <T>
 *  由于此时的T泛型还未明确，所以此时的类无法实例化，则不需要加上实例化注解
 *  也不要加访问路径的注解
 */
public class BaseController<T> {

    //依赖引入基础业务层对象
    @Autowired
    protected BaseService<T> baseService;

    //依赖注入订单业务层对象
    @Autowired
    protected OrderService orderService;

    //依赖注入客房销售记录业务层对象
    @Autowired
    protected RoomSaleService roomSaleService;

    //加载所有数据
    @RequestMapping("/loadAllT")
    public @ResponseBody List<T> loadAllT(){
        try {
            return baseService.findAllT();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *  分页加载数据
     * @param page 页面传来的当前页
     * @param limit 页面传来的每一页数据条数
     * @param t 页面传来的动态查询的条件
     * @return LayUI中table表格的分页数据
     */
    @RequestMapping("/loadPageTByPramas")
    public @ResponseBody Map<String,Object> loadPageTByPramas(Integer page, Integer limit, T t){
        System.out.println("page="+page+"\t"+"limit="+limit);
        System.out.println(t);
        Map<String, Object> map = null;
        try {
            //从业务层加载分页数据
            map = baseService.findPageTByPramas(page,limit,t);
            //加载数据成功
            map.put("code",0);  //表示数据加载成功
        } catch (Exception e) {
            map.put("code",500);
            e.printStackTrace();

        }
        return map;
    }

    /**
     *   比较传统的分页加载
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t 查询条件参数对象
     * @return  分页数据
     */
    @RequestMapping("/loadPageByPramas")
    public @ResponseBody Map<String,Object> loadPageByPramas(Integer page, Integer limit, T t){
        System.out.println("page="+page+"\t"+"limit="+limit);
        System.out.println(t);
        Map<String, Object> map = null;
        try {
            map = baseService.findPageTByPramas(page,limit,t);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    /**
     *   根据条件加载单个数据
     * @param t  条件参数
     * @return 单个数据
     */
    @RequestMapping("/loadOneByPramas")
    public @ResponseBody T loadOneByPramas(T t){
        try {
            return baseService.findOneByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据条件加载多条数据
     * @param t 查询条件
     * @return 多条数据
     * @throws Exception
     */
    @RequestMapping("/loadManyByPramas")
    public @ResponseBody  List<T>  loadManyByPramas(T t){
        try {
            return baseService.findManyByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据条件查询数据条数
     * @param t 条件参数对象
     * @return 数据条数
     */
    @RequestMapping("/loadCountByPramas")
    public @ResponseBody Integer loadCountByPramas(T t){
        try {
            return baseService.findCountByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *  根据主键id删除单个数据
     * @param id 主键id
     * @return 删除结果
     */
    @RequestMapping("/delTById")
    public @ResponseBody String delTById(Integer id){
        try {
            return baseService.removeTById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据主键id批量删除数据
     * @param ids 多个主键id数组
     * @return 删除结果
     */
    @RequestMapping("/delBatchTByIds")
    public @ResponseBody String delBatchTByIds(Integer[] ids){
        try {
            return baseService.removeBatchTByIds(ids);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //添加数据
    @RequestMapping("/saveT")
    public @ResponseBody String saveT(T t){
        try {
            return baseService.saveT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //修改数据
    @RequestMapping("/updT")
    public @ResponseBody String updT(T t){
        try {
            return baseService.updT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //动态修改数据
    @RequestMapping("/updByPrimaryKeySelective")
    public @ResponseBody String updByPrimaryKeySelective(T t){
        try {
            return baseService.updByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   动态批量修改
     * @param ids 多个主键id数组
     * @param t  修改的内容
     * @return 修改的结果
     * @throws Exception
     */
    @RequestMapping("/updBatchSelective")
    public @ResponseBody String updBatchSelective(Integer[] ids,T t){
        try {
            return baseService.updBatchSelective(ids,t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
