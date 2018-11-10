package com.djhouseknecht.monthlybudget.config.permissions;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    public Role findByName(String name);

}
