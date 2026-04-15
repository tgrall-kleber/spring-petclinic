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

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class OwnerTests {

	@Test
	void shouldReturnPrimaryAddress() {
		Owner owner = new Owner();
		Address firstAddress = address(AddressType.HOME, "10 Main St", "Springfield", false);
		Address primaryAddress = address(AddressType.WORK, "20 Center St", "Springfield", true);
		owner.addAddress(firstAddress);
		owner.addAddress(primaryAddress);

		assertThat(owner.getPrimaryAddress()).isSameAs(primaryAddress);
	}

	@Test
	void shouldFallBackToFirstAddressWhenNoneMarkedPrimary() {
		Owner owner = new Owner();
		Address firstAddress = address(AddressType.HOME, "10 Main St", "Springfield", false);
		Address secondAddress = address(AddressType.WORK, "20 Center St", "Springfield", false);
		owner.addAddress(firstAddress);
		owner.addAddress(secondAddress);

		assertThat(owner.getPrimaryAddress()).isSameAs(firstAddress);
	}

	@Test
	void shouldReturnNullWhenNoAddressExists() {
		assertThat(new Owner().getPrimaryAddress()).isNull();
	}

	private Address address(AddressType type, String street, String city, boolean primary) {
		Address address = new Address();
		address.setAddressType(type);
		address.setStreet(street);
		address.setCity(city);
		address.setPrimary(primary);
		return address;
	}

}
