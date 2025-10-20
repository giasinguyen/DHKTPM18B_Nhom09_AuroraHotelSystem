package com.aurora.backend.repository;

import com.aurora.backend.entity.Branch;
import com.aurora.backend.entity.Room;
import com.aurora.backend.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    // Original methods with IDs
    List<Room> findByBranchId(String branchId);
    Page<Room> findByBranchId(String branchId, Pageable pageable);
    List<Room> findByRoomTypeId(String roomTypeId);
    Page<Room> findByRoomTypeId(String roomTypeId, Pageable pageable);
    Page<Room> findByStatus(String status, Pageable pageable);
    Page<Room> findByFloor(Integer floor, Pageable pageable);
    Page<Room> findByRoomNumberContainingIgnoreCase(String roomNumber, Pageable pageable);
    boolean existsByBranchIdAndRoomNumber(String branchId, String roomNumber);
    
    // Additional methods with entities for service layer
    Page<Room> findByBranch(Branch branch, Pageable pageable);
    Page<Room> findByRoomType(RoomType roomType, Pageable pageable);
    boolean existsByBranchAndRoomNumber(Branch branch, String roomNumber);
    
    @Query("SELECT r FROM Room r WHERE " +
           "(:branch IS NULL OR r.branch = :branch) AND " +
           "(:roomType IS NULL OR r.roomType = :roomType) AND " +
           "(:status IS NULL OR :status = '' OR r.status = :status)")
    Page<Room> findByFilters(@Param("branch") Branch branch,
                           @Param("roomType") RoomType roomType,
                           @Param("status") String status,
                           Pageable pageable);
}
