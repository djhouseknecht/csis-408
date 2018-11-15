package com.djhouseknecht.monthlybudget.dataload;

import com.djhouseknecht.monthlybudget.privilege.Privilege;
import com.djhouseknecht.monthlybudget.privilege.PrivilegeRepository;
import com.djhouseknecht.monthlybudget.role.Role;
import com.djhouseknecht.monthlybudget.role.RoleRepository;
import com.djhouseknecht.monthlybudget.user.User;
import com.djhouseknecht.monthlybudget.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class InitialRolesLoader implements ApplicationListener<ContextRefreshedEvent> {

        private boolean alreadySetup = false;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private RoleRepository roleRepository;

        @Autowired
        private PrivilegeRepository privilegeRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        @Transactional
        public void onApplicationEvent(ContextRefreshedEvent event) {

            if (alreadySetup)
                return;
            Privilege readPrivilege
                    = createPrivilegeIfNotFound("READ_PRIVILEGE");
            Privilege writePrivilege
                    = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

            List<Privilege> adminPrivileges = Arrays.asList(
                    readPrivilege, writePrivilege);
            createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
            createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            User user = new User();
            user.setFirstName("Jane");
            user.setLastName("Jackson");
            user.setPassword(passwordEncoder.encode("Liberty123"));
            user.setEmail("janejackson@email.com");
            user.setRoles(Arrays.asList(adminRole));
            user.setEnabled(true);
            userRepository.save(user);

            alreadySetup = true;
        }

        @Transactional
        private Privilege createPrivilegeIfNotFound(String name) {

            Privilege privilege = privilegeRepository.findByName(name);
            if (privilege == null) {
                privilege = new Privilege(name);
                privilegeRepository.save(privilege);
            }
            return privilege;
        }

        @Transactional
        private Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {

            Role role = roleRepository.findByName(name);
            if (role == null) {
                role = new Role(name);
                role.setPrivileges(privileges);
                roleRepository.save(role);
            }
            return role;
        }

    }

