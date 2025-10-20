package com.aurora.backend.service;

import com.aurora.backend.dto.request.BranchCreationRequest;
import com.aurora.backend.dto.request.BranchUpdateRequest;
import com.aurora.backend.dto.response.BranchResponse;
import com.aurora.backend.entity.Branch;
import com.aurora.backend.entity.Branch.BranchStatus;
import com.aurora.backend.entity.User;
import com.aurora.backend.enums.ErrorCode;
import com.aurora.backend.exception.AppException;
import com.aurora.backend.mapper.BranchMapper;
import com.aurora.backend.repository.BranchRepository;
import com.aurora.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BranchService {
    
    BranchRepository branchRepository;
    UserRepository userRepository;
    BranchMapper branchMapper;

    @Transactional
    public BranchResponse createBranch(BranchCreationRequest request) {
        log.info("Creating new branch with code: {}", request.getCode());
        
        // Validate code uniqueness
        if (branchRepository.existsByCode(request.getCode())) {
            throw new AppException(ErrorCode.BRANCH_CODE_EXISTED);
        }
        
        Branch branch = branchMapper.toBranch(request);
        
        // Assign manager if provided
        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            
            // Validate manager has MANAGER role
            boolean hasManagerRole = manager.getRoles().stream()
                .anyMatch(role -> "MANAGER".equals(role.getName()));
            
            if (!hasManagerRole) {
                throw new AppException(ErrorCode.USER_NOT_MANAGER);
            }
            
            branch.setManager(manager);
            manager.setAssignedBranch(branch); // Assign branch to manager
        }
        
        Branch savedBranch = branchRepository.save(branch);
        log.info("Branch created successfully with ID: {}", savedBranch.getId());
        
        return branchMapper.toBranchResponse(savedBranch);
    }

    @Transactional
    public BranchResponse updateBranch(String id, BranchUpdateRequest request) {
        log.info("Updating branch with ID: {}", id);
        
        Branch branch = branchRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        // Update manager if provided
        if (request.getManagerId() != null) {
            // Remove old manager assignment
            if (branch.getManager() != null) {
                branch.getManager().setAssignedBranch(null);
            }
            
            // Assign new manager
            User newManager = userRepository.findById(request.getManagerId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            
            boolean hasManagerRole = newManager.getRoles().stream()
                .anyMatch(role -> "MANAGER".equals(role.getName()));
            
            if (!hasManagerRole) {
                throw new AppException(ErrorCode.USER_NOT_MANAGER);
            }
            
            branch.setManager(newManager);
            newManager.setAssignedBranch(branch);
        }
        
        branchMapper.updateBranch(branch, request);
        Branch updatedBranch = branchRepository.save(branch);
        
        log.info("Branch updated successfully: {}", id);
        return branchMapper.toBranchResponse(updatedBranch);
    }

    @Transactional
    public void deleteBranch(String id) {
        log.info("Deleting branch with ID: {}", id);
        
        Branch branch = branchRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        // Check if branch has rooms
        if (branch.getRooms() != null && !branch.getRooms().isEmpty()) {
            throw new AppException(ErrorCode.BRANCH_HAS_ROOMS);
        }
        
        // Remove manager assignment
        if (branch.getManager() != null) {
            branch.getManager().setAssignedBranch(null);
        }
        
        // Remove staff assignments
        if (branch.getStaff() != null) {
            branch.getStaff().forEach(staff -> staff.setAssignedBranch(null));
        }
        
        branchRepository.delete(branch);
        log.info("Branch deleted successfully: {}", id);
    }

    public BranchResponse getBranchById(String id) {
        log.debug("Fetching branch with ID: {}", id);
        
        Branch branch = branchRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        return branchMapper.toBranchResponse(branch);
    }

    public BranchResponse getBranchByCode(String code) {
        log.debug("Fetching branch with code: {}", code);
        
        Branch branch = branchRepository.findByCode(code)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        return branchMapper.toBranchResponse(branch);
    }

    public Page<BranchResponse> getAllBranches(Pageable pageable) {
        log.debug("Fetching all branches with pagination: {}", pageable);
        
        return branchRepository.findAll(pageable)
            .map(branchMapper::toBranchResponse);
    }

    public Page<BranchResponse> getBranchesByStatus(Branch.BranchStatus status, Pageable pageable) {
        log.debug("Fetching branches by status: {}", status);
        
        return branchRepository.findByStatus(status, pageable)
            .map(branchMapper::toBranchResponse);
    }

    public Page<BranchResponse> getBranchesByCity(String city, Pageable pageable) {
        log.debug("Fetching branches by city: {}", city);
        
        return branchRepository.findByCity(city, pageable)
            .map(branchMapper::toBranchResponse);
    }

    public Page<BranchResponse> searchBranches(String keyword, Pageable pageable) {
        log.debug("Searching branches with keyword: {}", keyword);
        
        return branchRepository.searchBranches(keyword, pageable)
            .map(branchMapper::toBranchResponse);
    }

    @Transactional
    public BranchResponse assignManager(String branchId, String managerId) {
        log.info("Assigning manager {} to branch {}", managerId, branchId);
        
        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        User manager = userRepository.findById(managerId)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        
        // Validate manager role
        boolean hasManagerRole = manager.getRoles().stream()
            .anyMatch(role -> "MANAGER".equals(role.getName()));
        
        if (!hasManagerRole) {
            throw new AppException(ErrorCode.USER_NOT_MANAGER);
        }
        
        // Remove old manager if exists
        if (branch.getManager() != null) {
            branch.getManager().setAssignedBranch(null);
        }
        
        // Assign new manager
        branch.setManager(manager);
        manager.setAssignedBranch(branch);
        
        branchRepository.save(branch);
        log.info("Manager assigned successfully");
        
        return branchMapper.toBranchResponse(branch);
    }

    @Transactional
    public BranchResponse removeManager(String branchId) {
        log.info("Removing manager from branch {}", branchId);
        
        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        if (branch.getManager() != null) {
            branch.getManager().setAssignedBranch(null);
            branch.setManager(null);
            branchRepository.save(branch);
        }
        
        log.info("Manager removed successfully");
        return branchMapper.toBranchResponse(branch);
    }

    public BranchResponse getBranchStatistics(String branchId) {
        log.debug("Fetching statistics for branch: {}", branchId);
        
        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
        
        return branchMapper.toBranchResponse(branch);
    }
}
