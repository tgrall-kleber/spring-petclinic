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

import java.util.Optional;

import jakarta.servlet.ServletException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.DisabledInNativeImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@WebMvcTest(AddressController.class)
@DisabledInNativeImage
@DisabledInAotMode
class AddressControllerTests {

	private static final int TEST_OWNER_ID = 1;

	private static final int TEST_ADDRESS_ID = 2;

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private OwnerRepository owners;

	private Owner owner;

	@BeforeEach
	void setup() {
		this.owner = new Owner();
		this.owner.setId(TEST_OWNER_ID);
		this.owner.setFirstName("George");
		this.owner.setLastName("Franklin");
		this.owner.setTelephone("6085551023");

		Address address = new Address();
		address.setId(TEST_ADDRESS_ID);
		address.setAddressType(AddressType.HOME);
		address.setStreet("110 W. Liberty St.");
		address.setCity("Madison");
		address.setState("WI");
		address.setZipCode("53703");
		address.setCountry("US");
		address.setPrimary(true);
		address.setOwner(this.owner);
		this.owner.getAddresses().add(address);

		given(this.owners.findById(TEST_OWNER_ID)).willReturn(Optional.of(this.owner));
	}

	@Test
	void initCreationForm() throws Exception {
		mockMvc.perform(get("/owners/{ownerId}/addresses/new", TEST_OWNER_ID))
			.andExpect(status().isOk())
			.andExpect(model().attributeExists("owner", "address"))
			.andExpect(view().name("owners/createOrUpdateAddressForm"));
	}

	@Test
	void processCreationFormSuccess() throws Exception {
		mockMvc
			.perform(post("/owners/{ownerId}/addresses/new", TEST_OWNER_ID).param("addressType", "WORK")
				.param("street", "1 Infinite Loop")
				.param("city", "Cupertino")
				.param("state", "CA")
				.param("zipCode", "95014")
				.param("country", "US")
				.param("primary", "true"))
			.andExpect(status().is3xxRedirection())
			.andExpect(redirectedUrl("/owners/" + TEST_OWNER_ID));

		verify(this.owners).save(this.owner);
	}

	@Test
	void processCreationFormHasErrors() throws Exception {
		mockMvc
			.perform(post("/owners/{ownerId}/addresses/new", TEST_OWNER_ID).param("addressType", "HOME")
				.param("street", "")
				.param("city", "Madison"))
			.andExpect(status().isOk())
			.andExpect(model().attributeHasErrors("address"))
			.andExpect(model().attributeHasFieldErrors("address", "street"))
			.andExpect(view().name("owners/createOrUpdateAddressForm"));
	}

	@Test
	void initUpdateForm() throws Exception {
		mockMvc.perform(get("/owners/{ownerId}/addresses/{addressId}/edit", TEST_OWNER_ID, TEST_ADDRESS_ID))
			.andExpect(status().isOk())
			.andExpect(model().attributeExists("owner", "address"))
			.andExpect(view().name("owners/createOrUpdateAddressForm"));
	}

	@Test
	void processUpdateFormSuccess() throws Exception {
		mockMvc
			.perform(post("/owners/{ownerId}/addresses/{addressId}/edit", TEST_OWNER_ID, TEST_ADDRESS_ID)
				.param("addressType", "OTHER")
				.param("street", "500 Memorial Dr")
				.param("city", "Cambridge")
				.param("state", "MA")
				.param("zipCode", "02139")
				.param("country", "US")
				.param("primary", "true"))
			.andExpect(status().is3xxRedirection())
			.andExpect(redirectedUrl("/owners/" + TEST_OWNER_ID));

		verify(this.owners).save(this.owner);
	}

	@Test
	void processUpdateFormHasErrors() throws Exception {
		mockMvc
			.perform(post("/owners/{ownerId}/addresses/{addressId}/edit", TEST_OWNER_ID, TEST_ADDRESS_ID)
				.param("addressType", "HOME")
				.param("street", "110 W. Liberty St.")
				.param("city", ""))
			.andExpect(status().isOk())
			.andExpect(model().attributeHasErrors("address"))
			.andExpect(model().attributeHasFieldErrors("address", "city"))
			.andExpect(view().name("owners/createOrUpdateAddressForm"));
	}

	@Test
	void processDeleteFormSuccess() throws Exception {
		mockMvc.perform(post("/owners/{ownerId}/addresses/{addressId}/delete", TEST_OWNER_ID, TEST_ADDRESS_ID))
			.andExpect(status().is3xxRedirection())
			.andExpect(redirectedUrl("/owners/" + TEST_OWNER_ID));

		verify(this.owners).save(this.owner);
	}

	@Test
	void shouldFailForUnknownOwner() throws Exception {
		given(this.owners.findById(99)).willReturn(Optional.empty());

		assertThatThrownBy(() -> this.mockMvc.perform(get("/owners/{ownerId}/addresses/new", 99)).andReturn())
			.isInstanceOf(ServletException.class)
			.hasRootCauseInstanceOf(IllegalArgumentException.class);
	}

	@Test
	void shouldFailForAddressOutsideOwner() throws Exception {
		assertThatThrownBy(
				() -> this.mockMvc.perform(get("/owners/{ownerId}/addresses/{addressId}/edit", TEST_OWNER_ID, 99))
					.andReturn())
			.isInstanceOf(ServletException.class)
			.hasRootCauseInstanceOf(IllegalArgumentException.class);
	}

}
