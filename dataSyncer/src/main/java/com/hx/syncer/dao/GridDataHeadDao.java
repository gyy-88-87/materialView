package com.hx.syncer.dao;

import com.hx.syncer.bean.GridDataHeadDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yahchen on 2017/10/29.
 */
@Service
public interface GridDataHeadDao extends JpaRepository<GridDataHeadDo,Long> {

    List<GridDataHeadDo> findAll();

    @Override
    <S extends GridDataHeadDo> List<S> save(Iterable<S> iterable);

    <S extends GridDataHeadDo> S save(S entity);

    void delete(String id);
}
