// Email Service Configuration
class EmailService {
  constructor() {
    // Initialize EmailJS
    // You'll need to replace these with your actual EmailJS credentials
    this.emailjsUserID = "YOUR_EMAILJS_USER_ID";
    this.serviceID = "YOUR_SERVICE_ID";
    this.companyTemplateID = "template_company";
    this.customerTemplateID = "template_customer";

    // Initialize EmailJS
    this.initEmailJS();
  }

  initEmailJS() {
    // Initialize EmailJS with your user ID
    emailjs.init(this.emailjsUserID);
  }

  async sendCompanyEmail(formData) {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "info@raydot.com", // Company email
      reply_to: formData.email,
    };

    try {
      const response = await emailjs.send(
        this.serviceID,
        this.companyTemplateID,
        templateParams
      );
      console.log("Company email sent successfully:", response);
      return { success: true, response };
    } catch (error) {
      console.error("Error sending company email:", error);
      return { success: false, error };
    }
  }

  async sendCustomerEmail(formData) {
    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      company_name: "RAYDOT Digital Agency",
      subject: `Thank you for contacting RAYDOT - Re: ${formData.subject}`,
      original_message: formData.message,
      from_email: "info@raydot.com",
    };

    try {
      const response = await emailjs.send(
        this.serviceID,
        this.customerTemplateID,
        templateParams
      );
      console.log("Customer email sent successfully:", response);
      return { success: true, response };
    } catch (error) {
      console.error("Error sending customer email:", error);
      return { success: false, error };
    }
  }

  async sendEmails(formData) {
    try {
      // Show loading state
      this.showLoading();

      // Send both emails concurrently
      const [companyResult, customerResult] = await Promise.all([
        this.sendCompanyEmail(formData),
        this.sendCustomerEmail(formData),
      ]);

      // Hide loading state
      this.hideLoading();

      if (companyResult.success && customerResult.success) {
        this.showSuccess(
          "Thank you! Your message has been sent successfully. We'll get back to you soon!"
        );
        return true;
      } else {
        this.showError(
          "There was an error sending your message. Please try again or contact us directly."
        );
        return false;
      }
    } catch (error) {
      this.hideLoading();
      this.showError(
        "Network error. Please check your connection and try again."
      );
      console.error("Email sending error:", error);
      return false;
    }
  }

  showLoading() {
    const submitBtn = document.querySelector(
      '#contact-form button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.innerHTML =
        '<i class="fa fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.disabled = true;
    }
  }

  hideLoading() {
    const submitBtn = document.querySelector(
      '#contact-form button[type="submit"]'
    );
    if (submitBtn) {
      submitBtn.innerHTML = "Send Message";
      submitBtn.disabled = false;
    }
  }

  showSuccess(message) {
    this.showAlert(message, "success");
  }

  showError(message) {
    this.showAlert(message, "danger");
  }

  showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector(".email-alert");
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create new alert
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} email-alert mt-3`;
    alertDiv.innerHTML = `
            <i class="fa fa-${
              type === "success" ? "check-circle" : "exclamation-triangle"
            } me-2"></i>
            ${message}
        `;

    // Insert alert before the form
    const form = document.querySelector("#contact-form");
    if (form) {
      form.parentNode.insertBefore(alertDiv, form);

      // Auto remove alert after 5 seconds
      setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 5000);
    }
  }

  validateForm(formData) {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!this.isValidEmail(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.subject.trim()) {
      errors.push("Subject is required");
    }

    if (!formData.message.trim()) {
      errors.push("Message is required");
    }

    return errors;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.emailService = new EmailService();
    this.initForm();
  }

  initForm() {
    const form = document.querySelector("#contact-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Validate form
    const errors = this.emailService.validateForm(formData);
    if (errors.length > 0) {
      this.emailService.showError(errors.join(", "));
      return;
    }

    // Send emails
    const success = await this.emailService.sendEmails(formData);

    if (success) {
      // Reset form
      document.getElementById("contact-form").reset();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if we're on the contact page and EmailJS is available
  if (
    typeof emailjs !== "undefined" &&
    document.querySelector("#contact-form")
  ) {
    new ContactFormHandler();
  }
});

// Alternative initialization for EmailJS loading
window.onload = function () {
  if (
    typeof emailjs !== "undefined" &&
    document.querySelector("#contact-form")
  ) {
    new ContactFormHandler();
  }
};
