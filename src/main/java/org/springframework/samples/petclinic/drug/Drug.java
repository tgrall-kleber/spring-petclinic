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

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Simple JavaBean domain object representing a drug in the catalog.
 */
@Entity
@Table(name = "drugs")
public class Drug extends BaseEntity {

@Column(name = "name", length = 80, nullable = false)
@NotBlank
@Size(max = 80)
private String name;

@Column(name = "category", length = 80, nullable = false)
@NotBlank
@Size(max = 80)
private String category;

@Column(name = "form", length = 40, nullable = false)
@NotBlank
@Size(max = 40)
private String form;

@Column(name = "price", precision = 5, scale = 2, nullable = false)
@NotNull
@DecimalMin("0.00")
@DecimalMax("999.99")
@Digits(integer = 3, fraction = 2)
private BigDecimal price;

@Column(name = "description", length = 255)
@Size(max = 255)
private String description;

public String getName() {
return this.name;
}

public void setName(String name) {
this.name = name;
}

public String getCategory() {
return this.category;
}

public void setCategory(String category) {
this.category = category;
}

public String getForm() {
return this.form;
}

public void setForm(String form) {
this.form = form;
}

public BigDecimal getPrice() {
return this.price;
}

public void setPrice(BigDecimal price) {
this.price = price;
}

public String getDescription() {
return this.description;
}

public void setDescription(String description) {
this.description = description;
}

}
