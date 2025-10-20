package com.aurora.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "branches")
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false)
    String name; // Tên chi nhánh (VD: "Aurora Hà Nội", "Aurora Sài Gòn")

    @Column(unique = true, nullable = false)
    String code; // Mã chi nhánh (VD: "AUR-HN", "AUR-SG")

    // Địa chỉ chi tiết
    String address; // Địa chỉ cụ thể (số nhà, đường)
    String ward; // Phường/Xã
    String district; // Quận/Huyện
    String city; // Thành phố/Tỉnh

    // Liên hệ
    @Column(nullable = false)
    String phone;
    
    String email;

    // Quản lý chi nhánh
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    User manager; // Người quản lý chi nhánh

    // Trạng thái
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    BranchStatus status; // ACTIVE, INACTIVE, MAINTENANCE

    // Thông tin hoạt động
    LocalDate openingDate; // Ngày khai trương
    
    LocalTime checkInTime; // Giờ nhận phòng (VD: 14:00)
    LocalTime checkOutTime; // Giờ trả phòng (VD: 12:00)
    
    String operatingHours; // Giờ hoạt động (VD: "24/7" hoặc "6:00 - 22:00")

    // Mô tả
    @Column(length = 1000)
    String description;

    // Relationships
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    Set<Room> rooms;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    Set<Facility> facilities;

    @OneToMany(mappedBy = "assignedBranch")
    Set<User> staff; // Danh sách nhân viên thuộc chi nhánh này

    // Enum for Branch Status
    public enum BranchStatus {
        ACTIVE,      // Đang hoạt động
        INACTIVE,    // Tạm ngừng
        MAINTENANCE  // Đang bảo trì
    }
}
