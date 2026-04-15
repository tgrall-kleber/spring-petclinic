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

import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller for managing {@link Address} entities belonging to an {@link Owner}.
 *
 * @author Tugdual Grall
 */
@Controller
@RequestMapping("/owners/{ownerId}")
class AddressController {

	private static final String VIEWS_ADDRESS_CREATE_OR_UPDATE_FORM = "owners/createOrUpdateAddressForm";

	private final OwnerRepository owners;

	public AddressController(OwnerRepository owners) {
		this.owners = owners;
	}

	@ModelAttribute("owner")
	public Owner findOwner(@PathVariable("ownerId") int ownerId) {
		Optional<Owner> optionalOwner = this.owners.findById(ownerId);
		return optionalOwner.orElseThrow(() -> new IllegalArgumentException(
				"Owner not found with id: " + ownerId + ". Please ensure the ID is correct "));
	}

	@ModelAttribute("address")
	public Address findAddress(@ModelAttribute("owner") Owner owner, @PathVariable("ownerId") int ownerId,
			@PathVariable(name = "addressId", required = false) Integer addressId) {

		if (addressId == null) {
			Address address = new Address();
			address.setAddressType(AddressType.HOME);
			return address;
		}

		return owner.getAddresses()
			.stream()
			.filter(a -> Objects.equals(a.getId(), addressId))
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException(
					"Address not found with id: " + addressId + " for owner: " + ownerId));
	}

	@InitBinder("owner")
	public void initOwnerBinder(WebDataBinder dataBinder) {
		dataBinder.setDisallowedFields("id");
	}

	@GetMapping("/addresses/new")
	public String initCreationForm() {
		return VIEWS_ADDRESS_CREATE_OR_UPDATE_FORM;
	}

	@PostMapping("/addresses/new")
	public String processCreationForm(Owner owner, @Valid Address address, BindingResult result,
			RedirectAttributes redirectAttributes) {

		if (result.hasErrors()) {
			return VIEWS_ADDRESS_CREATE_OR_UPDATE_FORM;
		}

		owner.addAddress(address);
		this.owners.save(owner);
		redirectAttributes.addFlashAttribute("message", "New Address has been Added");
		return "redirect:/owners/{ownerId}";
	}

	@GetMapping("/addresses/{addressId}/edit")
	public String initUpdateForm() {
		return VIEWS_ADDRESS_CREATE_OR_UPDATE_FORM;
	}

	@PostMapping("/addresses/{addressId}/edit")
	public String processUpdateForm(Owner owner, @Valid Address address, BindingResult result,
			RedirectAttributes redirectAttributes) {

		if (result.hasErrors()) {
			return VIEWS_ADDRESS_CREATE_OR_UPDATE_FORM;
		}

		this.owners.save(owner);
		redirectAttributes.addFlashAttribute("message", "Address details have been updated");
		return "redirect:/owners/{ownerId}";
	}

	@PostMapping("/addresses/{addressId}/delete")
	public String processDeleteForm(Owner owner, @ModelAttribute("address") Address address,
			RedirectAttributes redirectAttributes) {
		owner.getAddresses().remove(address);
		this.owners.save(owner);
		redirectAttributes.addFlashAttribute("message", "Address has been deleted");
		return "redirect:/owners/{ownerId}";
	}

}
