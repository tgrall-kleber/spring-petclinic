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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.DisabledInNativeImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@WebMvcTest(DrugController.class)
@DisabledInNativeImage
@DisabledInAotMode
class DrugControllerTests {

@Autowired
private MockMvc mockMvc;

@MockitoBean
private DrugRepository drugs;

private Drug amoxicillin() {
Drug drug = new Drug();
drug.setId(1);
drug.setName("Amoxicillin");
drug.setCategory("Antibiotic");
drug.setForm("Tablet");
drug.setPrice(new BigDecimal("18.50"));
drug.setDescription("Broad-spectrum antibiotic for common bacterial infections.");
return drug;
}

private Drug meloxicam() {
Drug drug = new Drug();
drug.setId(2);
drug.setName("Meloxicam");
drug.setCategory("Anti-inflammatory");
drug.setForm("Suspension");
drug.setPrice(new BigDecimal("23.50"));
drug.setDescription("Oral NSAID for inflammation and osteoarthritis pain.");
return drug;
}

@BeforeEach
void setup() {
given(this.drugs.findAll(any(Pageable.class))).willReturn(new PageImpl<>(List.of(amoxicillin(), meloxicam()),
PageRequest.of(0, 5), 8));
given(this.drugs.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(eq("pain"), eq("pain"),
any(Pageable.class))).willReturn(new PageImpl<>(List.of(meloxicam()), PageRequest.of(0, 5), 1));
given(this.drugs.findById(1)).willReturn(Optional.of(amoxicillin()));
}

@Test
void initFindForm() throws Exception {
this.mockMvc.perform(get("/drugs/find"))
.andExpect(status().isOk())
.andExpect(model().attributeExists("q"))
.andExpect(view().name("drugs/findDrugs"));
}

@Test
void showDrugListHtml() throws Exception {
this.mockMvc.perform(get("/drugs.html").param("q", "pain").param("page", "1"))
.andExpect(status().isOk())
.andExpect(model().attributeExists("listDrugs"))
.andExpect(model().attribute("q", "pain"))
.andExpect(view().name("drugs/drugList"));
}

@Test
void showDrugDetail() throws Exception {
this.mockMvc.perform(get("/drugs/{drugId}", 1))
.andExpect(status().isOk())
.andExpect(model().attribute("drug", hasProperty("name", is("Amoxicillin"))))
.andExpect(view().name("drugs/drugDetails"));
}

@Test
void showResourcesDrugList() throws Exception {
this.mockMvc.perform(get("/drugs").param("q", "pain").param("page", "1").param("size", "2")
.accept(MediaType.APPLICATION_JSON))
.andExpect(status().isOk())
.andExpect(content().contentType(MediaType.APPLICATION_JSON))
.andExpect(jsonPath("$.drugList[0].id").value(2))
.andExpect(jsonPath("$.query").value("pain"))
.andExpect(jsonPath("$.totalItems").value(1));
}

}
