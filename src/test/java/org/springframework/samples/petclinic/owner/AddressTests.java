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

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import static org.assertj.core.api.Assertions.assertThat;

class AddressTests {

	private Validator createValidator() {
		LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
		localValidatorFactoryBean.afterPropertiesSet();
		return localValidatorFactoryBean;
	}

	@Test
	void shouldSupportRoundTripPropertyAccess() {
		Address address = new Address();
		address.setAddressType(AddressType.WORK);
		address.setStreet("1600 Pennsylvania Ave");
		address.setCity("Washington");
		address.setState("DC");
		address.setZipCode("20500");
		address.setCountry("US");
		address.setPrimary(true);

		assertThat(address.getAddressType()).isEqualTo(AddressType.WORK);
		assertThat(address.getStreet()).isEqualTo("1600 Pennsylvania Ave");
		assertThat(address.getCity()).isEqualTo("Washington");
		assertThat(address.getState()).isEqualTo("DC");
		assertThat(address.getZipCode()).isEqualTo("20500");
		assertThat(address.getCountry()).isEqualTo("US");
		assertThat(address.isPrimary()).isTrue();
	}

	@Test
	void shouldDefaultPrimaryToFalse() {
		assertThat(new Address().isPrimary()).isFalse();
	}

	@Test
	void shouldAssociateOwner() {
		Owner owner = new Owner();
		Address address = new Address();
		address.setOwner(owner);

		assertThat(address.getOwner()).isSameAs(owner);
	}

	@Test
	void shouldValidateBlankStreet() {
		Address address = new Address();
		address.setAddressType(AddressType.HOME);
		address.setStreet("");
		address.setCity("Springfield");

		Set<ConstraintViolation<Address>> constraintViolations = createValidator().validate(address);

		assertThat(constraintViolations).extracting(violation -> violation.getPropertyPath().toString())
			.contains("street");
	}

	@Test
	void shouldValidateZipCodeLength() {
		Address address = new Address();
		address.setAddressType(AddressType.HOME);
		address.setStreet("742 Evergreen Terrace");
		address.setCity("Springfield");
		address.setZipCode("123456789012345678901");

		Set<ConstraintViolation<Address>> constraintViolations = createValidator().validate(address);

		assertThat(constraintViolations).extracting(violation -> violation.getPropertyPath().toString())
			.contains("zipCode");
	}

}
