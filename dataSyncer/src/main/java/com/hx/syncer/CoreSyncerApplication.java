package com.hx.syncer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CoreSyncerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreSyncerApplication.class, args);
	}
}
