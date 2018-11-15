package com.djhouseknecht.monthlybudget.privilege;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    public Privilege findByName(String name);
}
