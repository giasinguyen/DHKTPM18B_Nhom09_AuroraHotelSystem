package com.aurora.backend.repository;

import com.aurora.backend.entity.Branch;
import com.aurora.backend.entity.RoomEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomEventRepository extends JpaRepository<RoomEvent, String> {
    
    // Tìm events theo branch
    List<RoomEvent> findByBranch(Branch branch);
    
    Page<RoomEvent> findByBranch(Branch branch, Pageable pageable);
    
    // Tìm events theo status
    List<RoomEvent> findByStatus(RoomEvent.EventStatus status);
    
    Page<RoomEvent> findByStatus(RoomEvent.EventStatus status, Pageable pageable);
    
    // Tìm events theo branch và status
    List<RoomEvent> findByBranchAndStatus(Branch branch, RoomEvent.EventStatus status);
    
    Page<RoomEvent> findByBranchAndStatus(Branch branch, RoomEvent.EventStatus status, Pageable pageable);
    
    // Tìm events có startDate trong khoảng thời gian
    @Query("SELECT e FROM RoomEvent e WHERE e.startDate = :date AND e.status = :status")
    List<RoomEvent> findByStartDateAndStatus(@Param("date") LocalDate date, 
                                              @Param("status") RoomEvent.EventStatus status);
    
    // Tìm events có endDate trước một ngày cụ thể
    @Query("SELECT e FROM RoomEvent e WHERE e.endDate < :date AND e.status = :status")
    List<RoomEvent> findByEndDateBeforeAndStatus(@Param("date") LocalDate date, 
                                                   @Param("status") RoomEvent.EventStatus status);
    
    // Tìm events đang active (ngày hiện tại nằm trong khoảng startDate - endDate)
    // Eager load priceAdjustments để tránh LazyInitializationException
    @Query("SELECT DISTINCT e FROM RoomEvent e " +
           "LEFT JOIN FETCH e.priceAdjustments pa " +
           "WHERE :currentDate BETWEEN e.startDate AND e.endDate " +
           "AND e.status = 'ACTIVE' AND e.deleted = false " +
           "AND (pa.deleted = false OR pa IS NULL)")
    List<RoomEvent> findActiveEventsOnDate(@Param("currentDate") LocalDate currentDate);
    
    // Tìm active events theo branch
    @Query("SELECT DISTINCT e FROM RoomEvent e " +
           "LEFT JOIN FETCH e.priceAdjustments pa " +
           "WHERE e.branch = :branch " +
           "AND :currentDate BETWEEN e.startDate AND e.endDate " +
           "AND e.status = 'ACTIVE' AND e.deleted = false " +
           "AND (pa.deleted = false OR pa IS NULL)")
    List<RoomEvent> findActiveEventsByBranchOnDate(@Param("branch") Branch branch,
                                                     @Param("currentDate") LocalDate currentDate);
    
    // Tìm events theo khoảng thời gian (có overlap với khoảng thời gian cho trước)
    @Query("SELECT e FROM RoomEvent e WHERE " +
           "(e.startDate <= :endDate AND e.endDate >= :startDate) " +
           "AND e.deleted = false")
    List<RoomEvent> findEventsInDateRange(@Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);
    
    // Tìm events theo branch và khoảng thời gian
    @Query("SELECT e FROM RoomEvent e WHERE e.branch = :branch " +
           "AND (e.startDate <= :endDate AND e.endDate >= :startDate) " +
           "AND e.deleted = false")
    List<RoomEvent> findEventsByBranchInDateRange(@Param("branch") Branch branch,
                                                    @Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate);
    
    // Tìm events với filter tổng hợp
    @Query("SELECT e FROM RoomEvent e WHERE " +
           "(:branchId IS NULL OR e.branch.id = :branchId) AND " +
           "(:status IS NULL OR e.status = :status) AND " +
           "(:startDate IS NULL OR e.startDate >= :startDate) AND " +
           "(:endDate IS NULL OR e.endDate <= :endDate) AND " +
           "e.deleted = false")
    Page<RoomEvent> findByFilters(@Param("branchId") String branchId,
                                   @Param("status") RoomEvent.EventStatus status,
                                   @Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate,
                                   Pageable pageable);
    
    // Kiểm tra xem có event nào đang active cho branch không
    @Query("SELECT COUNT(e) > 0 FROM RoomEvent e WHERE e.branch = :branch " +
           "AND :currentDate BETWEEN e.startDate AND e.endDate " +
           "AND e.status = 'ACTIVE' AND e.deleted = false")
    boolean hasActiveEvents(@Param("branch") Branch branch, 
                            @Param("currentDate") LocalDate currentDate);
}

