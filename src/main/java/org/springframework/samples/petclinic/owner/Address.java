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
package org.springframework.samples.petclinic.owner;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Simple JavaBean domain object representing an address belonging to an {@link Owner}.
 *
 * @author Tugdual Grall
 */
@Entity
@Table(name = "owner_addresses")
public class Address extends BaseEntity {

	@Column(nullable = false)
	@NotNull
	@Enumerated(EnumType.STRING)
	private AddressType addressType;

	@Column(length = 255, nullable = false)
	@NotBlank
	@Size(max = 255)
	private String street;

	@Column(length = 80, nullable = false)
	@NotBlank
	@Size(max = 80)
	private String city;

	@Column(length = 80)
	@Size(max = 80)
	private String state;

	@Column(length = 20)
	@Size(max = 20)
	private String zipCode;

	@Column(length = 80)
	@Size(max = 80)
	private String country;

	@Column
	private boolean isPrimary;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "owner_id", nullable = false)
	private Owner owner;

	public AddressType getAddressType() {
		return this.addressType;
	}

	public void setAddressType(AddressType addressType) {
		this.addressType = addressType;
	}

	public String getStreet() {
		return this.street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return this.zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public boolean isPrimary() {
		return this.isPrimary;
	}

	public void setPrimary(boolean primary) {
		this.isPrimary = primary;
	}

	public Owner getOwner() {
		return this.owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

}
