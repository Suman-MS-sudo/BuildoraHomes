import { useState } from 'react';

type IntakeFormData = {
  fullName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  preferredContact: string;
  projectType: string;
  plotArea: string;
  builtUpArea: string;
  numberOfFloors: string;
  expectedBudget: string;
  expectedStartDate: string;
  expectedCompletionDate: string;
  siteAddress: string;
  surveyNumber: string;
  propertyType: string;
  siteFacing: string;
  accessRoadWidth: string;
  houseStyle: string;
  interiorFinish: string;
  exteriorFinish: string;
  requiredAmenities: string;
  specialRequests: string;
  ownershipDoc: File | null;
  sitePlan: File | null;
  architecturalDrawings: File | null;
  identityProof: File | null;
  photoOfPlot: File | null;
  otherFiles: File | null;
  additionalNotes: string;
};

export default function IntakePage() {
  const [formData, setFormData] = useState<IntakeFormData>({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    preferredContact: 'Phone',
    projectType: 'New Construction',
    plotArea: '',
    builtUpArea: '',
    numberOfFloors: '',
    expectedBudget: '',
    expectedStartDate: '',
    expectedCompletionDate: '',
    siteAddress: '',
    surveyNumber: '',
    propertyType: 'Residential',
    siteFacing: '',
    accessRoadWidth: '',
    houseStyle: 'Modern',
    interiorFinish: '',
    exteriorFinish: '',
    requiredAmenities: '',
    specialRequests: '',
    ownershipDoc: null,
    sitePlan: null,
    architecturalDrawings: null,
    identityProof: null,
    photoOfPlot: null,
    otherFiles: null,
    additionalNotes: '',
  });
  const [formSubmitted] = useState(
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('submitted') === '1'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // No JS submit handler — we let the browser POST natively to FormSubmit so file uploads are included.

  return (
    <section className="intake-section">
      <div className="section-head">
        <p className="section-tag">CLIENT INTAKE</p>
        <h2 className="section-h2">Share your project details on a dedicated page.</h2>
        <p className="section-sub">Use this separate intake page to fill the form and upload the required documents from your PDF.</p>
      </div>

      <div className="intake-form-wrap">
        <form
          className="intake-form"
          action="https://formsubmit.co/admin@buildorahomes.co.in"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="_subject" value="New Client Intake — Buildora Homes" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value={typeof window !== 'undefined' ? `${window.location.origin}/?submitted=1#client-intake` : '/'}
          />
          {formSubmitted && (
            <div className="form-success">Thank you! Your project details have been sent to our team. We will contact you shortly.</div>
          )}

          <div className="form-grid">
            <div className="form-card">
              <h3>Client Information</h3>
              <label className="form-group">
                <span className="form-label">Full Name</span>
                <input name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" type="text" placeholder="Enter full name" required />
              </label>
              <label className="form-group">
                <span className="form-label">Email Address</span>
                <input name="email" value={formData.email} onChange={handleChange} className="form-input" type="email" placeholder="Enter email" required />
              </label>
              <label className="form-group">
                <span className="form-label">Phone Number</span>
                <input name="phone" value={formData.phone} onChange={handleChange} className="form-input" type="tel" placeholder="Enter phone" required />
              </label>
              <label className="form-group">
                <span className="form-label">Alternate Phone</span>
                <input name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} className="form-input" type="tel" placeholder="Alternate contact number" />
              </label>
              <label className="form-group">
                <span className="form-label">Preferred Contact Method</span>
                <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="form-input">
                  <option>Phone</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                </select>
              </label>
            </div>

            <div className="form-card">
              <h3>Project Details</h3>
              <label className="form-group">
                <span className="form-label">Project Type</span>
                <select name="projectType" value={formData.projectType} onChange={handleChange} className="form-input">
                  <option>New Construction</option>
                  <option>Renovation</option>
                  <option>Extension</option>
                  <option>Interior Finish</option>
                </select>
              </label>
              <label className="form-group">
                <span className="form-label">Plot Area / Built-up Area</span>
                <input name="plotArea" value={formData.plotArea} onChange={handleChange} className="form-input" type="text" placeholder="e.g. 1200 sq ft" />
              </label>
              <label className="form-group">
                <span className="form-label">Built-up Area</span>
                <input name="builtUpArea" value={formData.builtUpArea} onChange={handleChange} className="form-input" type="text" placeholder="e.g. 850 sq ft" />
              </label>
              <label className="form-group">
                <span className="form-label">Number of Floors</span>
                <input name="numberOfFloors" value={formData.numberOfFloors} onChange={handleChange} className="form-input" type="number" placeholder="Number of floors" min="0" />
              </label>
              <label className="form-group">
                <span className="form-label">Expected Budget</span>
                <input name="expectedBudget" value={formData.expectedBudget} onChange={handleChange} className="form-input" type="text" placeholder="Enter expected budget" />
              </label>
              <label className="form-group">
                <span className="form-label">Start Date</span>
                <input name="expectedStartDate" value={formData.expectedStartDate} onChange={handleChange} className="form-input" type="date" />
              </label>
              <label className="form-group">
                <span className="form-label">Expected Completion</span>
                <input name="expectedCompletionDate" value={formData.expectedCompletionDate} onChange={handleChange} className="form-input" type="date" />
              </label>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-card">
              <h3>Site & Ownership Information</h3>
              <label className="form-group">
                <span className="form-label">Site Address</span>
                <input name="siteAddress" value={formData.siteAddress} onChange={handleChange} className="form-input" type="text" placeholder="Enter site address" />
              </label>
              <label className="form-group">
                <span className="form-label">Survey Number / Plot No.</span>
                <input name="surveyNumber" value={formData.surveyNumber} onChange={handleChange} className="form-input" type="text" placeholder="Enter survey number" />
              </label>
              <label className="form-group">
                <span className="form-label">Property Type</span>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="form-input">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed Use</option>
                  <option>Farm House / Villa</option>
                </select>
              </label>
              <label className="form-group">
                <span className="form-label">Site Facing</span>
                <input name="siteFacing" value={formData.siteFacing} onChange={handleChange} className="form-input" type="text" placeholder="North / South / East / West" />
              </label>
              <label className="form-group">
                <span className="form-label">Access Road Width</span>
                <input name="accessRoadWidth" value={formData.accessRoadWidth} onChange={handleChange} className="form-input" type="text" placeholder="e.g. 15 ft" />
              </label>
            </div>

            <div className="form-card">
              <h3>Design Preferences</h3>
              <label className="form-group">
                <span className="form-label">Preferred House Style</span>
                <select name="houseStyle" value={formData.houseStyle} onChange={handleChange} className="form-input">
                  <option>Modern</option>
                  <option>Contemporary</option>
                  <option>Traditional</option>
                  <option>Minimalist</option>
                  <option>Luxury</option>
                </select>
              </label>
              <label className="form-group">
                <span className="form-label">Interior Finish Preference</span>
                <input name="interiorFinish" value={formData.interiorFinish} onChange={handleChange} className="form-input" type="text" placeholder="e.g. premium, standard" />
              </label>
              <label className="form-group">
                <span className="form-label">Exterior Finish Preference</span>
                <input name="exteriorFinish" value={formData.exteriorFinish} onChange={handleChange} className="form-input" type="text" placeholder="e.g. plaster, paint, stone" />
              </label>
              <label className="form-group">
                <span className="form-label">Required Amenities</span>
                <textarea name="requiredAmenities" value={formData.requiredAmenities} onChange={handleChange} className="form-textarea" rows={3} placeholder="e.g. lift, pool, car parking"></textarea>
              </label>
              <label className="form-group">
                <span className="form-label">Special Requests</span>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} className="form-textarea" rows={3} placeholder="Enter any special requirements"></textarea>
              </label>
            </div>
          </div>

          <div className="form-grid file-grid">
            <div className="form-card">
              <h3>Upload Documents</h3>
              <label className="form-group">
                <span className="form-label">Ownership Document</span>
                <input name="ownershipDoc" onChange={handleChange} className="form-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                {formData.ownershipDoc && <span className="file-name">{formData.ownershipDoc.name}</span>}
              </label>
              <label className="form-group">
                <span className="form-label">Site Plan / Layout</span>
                <input name="sitePlan" onChange={handleChange} className="form-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                {formData.sitePlan && <span className="file-name">{formData.sitePlan.name}</span>}
              </label>
              <label className="form-group">
                <span className="form-label">Architectural Drawings</span>
                <input name="architecturalDrawings" onChange={handleChange} className="form-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                {formData.architecturalDrawings && <span className="file-name">{formData.architecturalDrawings.name}</span>}
              </label>
            </div>
            <div className="form-card">
              <h3>Additional Uploads</h3>
              <label className="form-group">
                <span className="form-label">Identity Proof</span>
                <input name="identityProof" onChange={handleChange} className="form-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                {formData.identityProof && <span className="file-name">{formData.identityProof.name}</span>}
              </label>
              <label className="form-group">
                <span className="form-label">Photo of Plot / Site</span>
                <input name="photoOfPlot" onChange={handleChange} className="form-file" type="file" accept=".jpg,.jpeg,.png" />
                {formData.photoOfPlot && <span className="file-name">{formData.photoOfPlot.name}</span>}
              </label>
              <label className="form-group">
                <span className="form-label">Other Supporting Files</span>
                <input name="otherFiles" onChange={handleChange} className="form-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                {formData.otherFiles && <span className="file-name">{formData.otherFiles.name}</span>}
              </label>
            </div>
          </div>

          <div className="form-card form-card-full">
            <label className="form-group">
              <span className="form-label">Additional Notes</span>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="form-textarea" rows={4} placeholder="Share any other important details from the intake PDF."></textarea>
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="submit" className="btn-gold form-submit">Submit Your Details</button>
              <a href="#top" className="btn-text-link">Back to Home</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
