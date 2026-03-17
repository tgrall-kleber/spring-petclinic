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

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller for the read-only drug catalog UI and JSON endpoint.
 */
@Controller
class DrugController {

private static final int DEFAULT_PAGE_SIZE = 5;

private final DrugRepository drugs;

DrugController(DrugRepository drugs) {
this.drugs = drugs;
}

@GetMapping("/drugs/find")
public String initFindForm(Model model) {
model.addAttribute("q", "");
return "drugs/findDrugs";
}

@GetMapping("/drugs.html")
public String showDrugList(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "1") int page,
Model model) {
Page<Drug> paginated = findPaginated(page, DEFAULT_PAGE_SIZE, q);
return addPaginationModel(page, normalizeQuery(q), paginated, model);
}

@GetMapping("/drugs/{drugId}")
public String showDrug(@PathVariable("drugId") int drugId, Model model) {
Drug drug = this.drugs.findById(drugId)
.orElseThrow(() -> new IllegalArgumentException("Drug not found with id: " + drugId));
model.addAttribute("drug", drug);
return "drugs/drugDetails";
}

@GetMapping("/drugs")
public @ResponseBody Drugs showResourcesDrugList(@RequestParam(defaultValue = "") String q,
@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "5") int size) {
Page<Drug> paginated = findPaginated(page, size, q);
Drugs response = new Drugs();
response.getDrugList().addAll(paginated.getContent());
response.setCurrentPage(page);
response.setTotalPages(paginated.getTotalPages());
response.setTotalItems(paginated.getTotalElements());
response.setPageSize(paginated.getSize());
response.setQuery(normalizeQuery(q));
return response;
}

private String addPaginationModel(int page, String query, Page<Drug> paginated, Model model) {
List<Drug> listDrugs = paginated.getContent();
model.addAttribute("currentPage", page);
model.addAttribute("totalPages", paginated.getTotalPages());
model.addAttribute("totalItems", paginated.getTotalElements());
model.addAttribute("listDrugs", listDrugs);
model.addAttribute("q", query);
return "drugs/drugList";
}

private Page<Drug> findPaginated(int page, int size, String q) {
int pageNumber = Math.max(page, 1) - 1;
int pageSize = size > 0 ? size : DEFAULT_PAGE_SIZE;
Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("name").ascending());
String query = normalizeQuery(q);
if (query.isBlank()) {
return this.drugs.findAll(pageable);
}
return this.drugs.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query, pageable);
}

private String normalizeQuery(String q) {
return q == null ? "" : q.trim();
}

}
