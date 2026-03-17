/*
 * Copyright 2012-2025 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.drug;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase.Replace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class DrugRepositoryTests {

	@Autowired
	private DrugRepository drugs;

	@Test
	void shouldFindAllDrugsPagedAndSortedByName() {
		Page<Drug> page = this.drugs.findAll(PageRequest.of(0, 5, Sort.by("name").ascending()));

		assertThat(page.getTotalElements()).isEqualTo(30);
		assertThat(page.getContent()).hasSize(5);
		assertThat(page.getContent()).extracting(Drug::getName)
			.containsExactly("Amantadine", "Amoxicillin", "Buprenorphine", "Carprofen", "Cefovecin");
	}

	@Test
	void shouldFindDrugsByNameOrCategory() {
		Page<Drug> page = this.drugs.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase("dermatology",
				"dermatology", PageRequest.of(0, 5, Sort.by("name").ascending()));

		assertThat(page.getTotalElements()).isEqualTo(5);
		assertThat(page.getContent()).extracting(Drug::getCategory).containsOnly("Dermatology");
	}

}
