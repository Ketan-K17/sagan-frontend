import { useState, ChangeEvent } from "react";
import { X, Paperclip } from "lucide-react";

interface prop {
  closeModal: () => void;
}

interface CustomField {
  id: number;
  label: string;
  value: string;
}

interface Section {
  id: string;
  title: string;
  fields: CustomField[];
}

interface FormData {
  company: {
    name: string;
    address: string;
    teamSize: string;
    website: string;
  };
  author: {
    firstName: string;
    lastName: string;
    position: string;
  };
  pi: {
    firstName: string;
    lastName: string;
    position: string;
  };
  copi: {
    firstName: string;
    lastName: string;
    position: string;
  };
}

// type FileState = File | null;

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

// Type for a custom section
interface Section {
  id: string;
  title: string;
  fields: CustomField[]; // Assuming `fields` can be an array of any type, you can adjust this based on the actual structure
}
const CompanyForm = ({ closeModal }: prop) => {
  // const [selectedSection, setSelectedSection] = useState("company");
  // const [customSections, setCustomSections] = useState<Section[]>([]);
  // const [authorResume, setAuthorResume] = useState(null);
  // const [piResume, setPiResume] = useState(null);
  // const [copiResume, setCopiResume] = useState(null);
  // const [useAuthorInfo, setUseAuthorInfo] = useState(false);

  const [selectedSection, setSelectedSection] = useState<string>("company");
  const [customSections, setCustomSections] = useState<Section[]>([]);
  const [authorResume, setAuthorResume] = useState<File | null>(null);
  const [piResume, setPiResume] = useState<File | null>(null);
  const [copiResume, setCopiResume] = useState<File | null>(null);
  const [useAuthorInfo, setUseAuthorInfo] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    company: {
      name: "",
      address: "",
      teamSize: "",
      website: "",
    },
    author: {
      firstName: "",
      lastName: "",
      position: "",
    },
    pi: {
      firstName: "",
      lastName: "",
      position: "",
    },
    copi: {
      firstName: "",
      lastName: "",
      position: "",
    },
  });

  const handleSectionChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === "add_section") {
      addCustomSection();
    } else {
      setSelectedSection(value);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    setFileState: (file: File | null) => void
  ) => {
    // const file = event.target.files[0];
    // if (file) {
    //   setFileState(file);
    // }

    const files = event.target.files;
    if (files && files[0]) {
      setFileState(files[0]);
    }
  };

  const handleUseAuthorInfo = () => {
    setUseAuthorInfo(true);
    setFormData((prev) => ({
      ...prev,
      pi: {
        ...prev.author,
      },
    }));
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      title: `Custom Section ${customSections.length + 1}`,
      fields: [],
    };
    setCustomSections((prev) => [...prev, newSection]);
    setSelectedSection(newSection.id);
  };

  // const addCustomField = (sectionId) => {
  //   setCustomSections((prev) =>
  //     prev.map((section) => {
  //       if (section.id === sectionId) {
  //         return {
  //           ...section,
  //           fields: [
  //             ...section.fields,
  //             {
  //               id: Date.now(),
  //               label: `Field ${section.fields.length + 1}`,
  //               value: "",
  //             },
  //           ],
  //         };
  //       }
  //       return section;
  //     })
  //   );
  // };

  const InputField = ({
    label,
    value,
    onChange,
    type = "text",
  }: InputFieldProps) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                 text-slate-300 placeholder-slate-500 
                 focus:outline-none focus:border-blue-500/50
                 transition-colors"
      />
    </div>
  );

  const sections = [
    { value: "company", label: "Company Information" },
    { value: "author", label: "Author Information" },
    { value: "pi", label: "Principal Investigator (PI)" },
    { value: "copi", label: "Co-Principal Investigator (Co-PI)" },
    ...customSections.map((section) => ({
      value: section?.id,
      label: section?.title,
    })),
    { value: "add_section", label: "+ Add New Section" },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "company":
        return (
          <div className="space-y-4">
            <InputField
              label="Company Name"
              value={formData.company.name}
              onChange={(e) =>
                handleInputChange("company", "name", e.target.value)
              }
            />
            <InputField
              label="Company Address"
              value={formData.company.address}
              onChange={(e) =>
                handleInputChange("company", "address", e.target.value)
              }
            />
            <InputField
              label="Team Size"
              value={formData.company.teamSize}
              onChange={(e) =>
                handleInputChange("company", "teamSize", e.target.value)
              }
              type="number"
            />
            <InputField
              label="Company Website"
              value={formData.company.website}
              onChange={(e) =>
                handleInputChange("company", "website", e.target.value)
              }
              type="url"
            />
          </div>
        );

      case "author":
        return (
          <div className="space-y-4">
            <InputField
              label="First Name"
              value={formData.author.firstName}
              onChange={(e) =>
                handleInputChange("author", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.author.lastName}
              onChange={(e) =>
                handleInputChange("author", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.author.position}
              onChange={(e) =>
                handleInputChange("author", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="authorResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setAuthorResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="authorResume"
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {authorResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {authorResume?.name}
                </div>
              )}
            </div>
          </div>
        );

      case "pi":
        return (
          <div className="space-y-4">
            <button
              onClick={handleUseAuthorInfo}
              className="px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                       text-blue-400 font-medium hover:bg-blue-500/20 transition-all"
            >
              Same as Author
            </button>
            <InputField
              label="First Name"
              value={formData.pi.firstName}
              onChange={(e) =>
                handleInputChange("pi", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.pi.lastName}
              onChange={(e) =>
                handleInputChange("pi", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.pi.position}
              onChange={(e) =>
                handleInputChange("pi", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="piResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setPiResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="piResume"
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {piResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {piResume?.name}
                </div>
              )}
            </div>
          </div>
        );

      case "copi":
        return (
          <div className="space-y-4">
            <InputField
              label="First Name"
              value={formData.copi.firstName}
              onChange={(e) =>
                handleInputChange("copi", "firstName", e.target.value)
              }
            />
            <InputField
              label="Last Name"
              value={formData.copi.lastName}
              onChange={(e) =>
                handleInputChange("copi", "lastName", e.target.value)
              }
            />
            <InputField
              label="Position"
              value={formData.copi.position}
              onChange={(e) =>
                handleInputChange("copi", "position", e.target.value)
              }
            />
            <div>
              <input
                type="file"
                id="copiResume"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setCopiResume)}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="copiResume"
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                text-blue-400 font-medium hover:bg-blue-500/20 transition-all cursor-pointer w-fit"
              >
                <Paperclip className="h-4 w-4" />
                <span>Upload Resume</span>
              </label>
              {copiResume && (
                <div className="mt-2 text-sm text-slate-300">
                  {copiResume?.name}
                </div>
              )}
            </div>
          </div>
        );

      // default:
      //   const customSection = customSections.find(
      //     (section) => section.id === selectedSection
      //   );
      //   if (customSection) {
      //     return (
      //       <div className="space-y-4">
      //         {customSection.fields.map((field) => (
      //           <InputField
      //             key={field.id}
      //             label={field.label}
      //             value={field.value}
      //             onChange={(e) => {
      //               setCustomSections((prev) =>
      //                 prev.map((s) => {
      //                   if (s.id === customSection.id) {
      //                     return {
      //                       ...s,
      //                       fields: s.fields.map((f) =>
      //                         f.id === field.id
      //                           ? { ...f, value: e.target.value }
      //                           : f
      //                       ),
      //                     };
      //                   }
      //                   return s;
      //                 })
      //               );
      //             }}
      //           />
      //         ))}
      //         <button
      //           onClick={() => addCustomField(customSection.id)}
      //           className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      //         >
      //           <Plus size={16} />
      //           <span>Add Field</span>
      //         </button>
      //       </div>
      //     );
      //   }
      //   return null;

      case "customSectionId": {
        const customSection = customSections.find(
          (section) => section.id === selectedSection
        );
        if (customSection) {
          return (
            <div className="space-y-4">
              {customSection.fields.map((field) => (
                <InputField
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => {
                    setCustomSections((prev) =>
                      prev.map((s) => {
                        if (s.id === customSection.id) {
                          return {
                            ...s,
                            fields: s.fields.map((f) =>
                              f.id === field.id
                                ? { ...f, value: e.target.value }
                                : f
                            ),
                          };
                        }
                        return s;
                      })
                    );
                  }}
                />
              ))}
            </div>
          );
        }
        break;
      }
    }
  };

  return (
    <div className="relative w-full max-w-md bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg shadow-lg p-6 mx-4">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Company Information
      </h2>

      {/* Section Selector */}
      <select
        value={selectedSection}
        onChange={handleSectionChange}
        className="w-full px-3 py-2 bg-[#2a2a2a] rounded-lg 
                   text-slate-300 mb-6
                   focus:outline-none focus:border-blue-500/50
                   transition-colors"
      >
        {sections.map((section) => (
          <option
            key={section.value}
            value={section.value}
            className={section.value === "add_section" ? "text-blue-400" : ""}
          >
            {section.label}
          </option>
        ))}
      </select>

      {/* Form Content */}
      {renderSection()}

      {/* Submit Button */}
      <button
        onClick={() => {
          console.log("Form Data:", { ...formData, customSections });
          closeModal();
        }}
        className="w-full mt-6 px-4 py-2 bg-[#2a2a2a] border border-blue-500/20 rounded-lg 
                   text-blue-400 font-medium hover:bg-blue-500/20 transition-all
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        Submit
      </button>
    </div>
  );
};

export default CompanyForm;
