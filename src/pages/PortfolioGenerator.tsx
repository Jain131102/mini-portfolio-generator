import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Wand2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSection } from "@/components/portfolio/FormSection";
import { PreviewWindow } from "@/components/portfolio/PreviewWindow";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { ZipExporter } from "@/components/portfolio/ZipExporter";
import { PortfolioFormData, portfolioSchema } from "@/lib/validation";
import { generatePortfolioFiles } from "@/lib/portfolio-generator";
import { sampleData } from "@/lib/sample-data";
import { useToast } from "@/hooks/use-toast";

export default function PortfolioGenerator() {
  const [isDark, setIsDark] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState(() => 
    generatePortfolioFiles(sampleData, false)
  );
  const { toast } = useToast();

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: sampleData,
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  // Auto-generate on form changes
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data && form.formState.isValid) {
        try {
          const files = generatePortfolioFiles(data as PortfolioFormData, isDark);
          setGeneratedFiles(files);
        } catch (error) {
          console.error("Generation error:", error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isDark]);

  const handleGenerate = () => {
    const data = form.getValues();
    try {
      const files = generatePortfolioFiles(data, isDark);
      setGeneratedFiles(files);
      toast({
        title: "Portfolio generated!",
        description: "Your portfolio has been updated in the preview.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please check your form data and try again.",
        variant: "destructive",
      });
    }
  };

  const handleFillSample = () => {
    form.reset(sampleData);
    toast({
      title: "Sample data loaded!",
      description: "The form has been filled with sample portfolio data.",
    });
  };

  const portfolioName = form.watch("personal.name") || "portfolio";

  return (
    <div className="min-h-screen gradient-surface">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Mini Portfolio Generator
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Create beautiful, responsive portfolios in minutes
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleGenerate}
                  className="flex items-center gap-2 gradient-primary text-white hover:shadow-glow transition-smooth"
                >
                  <Wand2 className="h-4 w-4" />
                  Generate
                </Button>
                <ZipExporter files={generatedFiles} portfolioName={portfolioName} />
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                <Button
                  variant="outline"
                  onClick={handleFillSample}
                  className="flex items-center gap-2 transition-smooth"
                >
                  <FileText className="h-4 w-4" />
                  Sample Data
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Form Panel */}
          <div className="overflow-y-auto space-y-6 pr-2">
            <Form {...form}>
              <form className="space-y-6">
                {/* Personal Information */}
                <FormSection title="Personal Information" description="Basic details about yourself">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personal.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personal.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personal.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personal.location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="San Francisco, CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="personal.summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Summary *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of your professional background and goals..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                {/* Education */}
                <FormSection title="Education" description="Your educational background">
                  {educationFields.map((field, index) => (
                    <Card key={field.id} className="relative border-2 border-dashed border-muted">
                      <CardContent className="pt-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input placeholder="Bachelor of Science" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.institution`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institution</FormLabel>
                                <FormControl>
                                  <Input placeholder="University Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.year`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                  <Input placeholder="2015-2019" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.grade`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Grade (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="3.8 GPA" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
                          className="absolute top-2 right-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendEducation({
                      id: `edu-${Date.now()}`,
                      degree: "",
                      institution: "",
                      year: "",
                      grade: ""
                    })}
                    className="flex items-center gap-2 w-full transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                    Add Education
                  </Button>
                </FormSection>

                {/* Experience */}
                <FormSection title="Experience" description="Your work experience">
                  {experienceFields.map((field, index) => (
                    <Card key={field.id} className="relative border-2 border-dashed border-muted">
                      <CardContent className="pt-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`experience.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${index}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input placeholder="Tech Company Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${index}.duration`}
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input placeholder="2020 - Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name={`experience.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your responsibilities and achievements..."
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(index)}
                          className="absolute top-2 right-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendExperience({
                      id: `exp-${Date.now()}`,
                      title: "",
                      company: "",
                      duration: "",
                      description: ""
                    })}
                    className="flex items-center gap-2 w-full transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </FormSection>

                {/* Projects */}
                <FormSection title="Projects" description="Showcase your best work (2-3 recommended)">
                  {projectFields.map((field, index) => (
                    <Card key={field.id} className="relative border-2 border-dashed border-muted">
                      <CardContent className="pt-6">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Title</FormLabel>
                              <FormControl>
                                <Input placeholder="My Awesome Project" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`projects.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe what this project does and your role in it..."
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`projects.${index}.technologies`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Technologies (comma-separated)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="React, Node.js, MongoDB"
                                  value={field.value?.join(", ") || ""}
                                  onChange={(e) => {
                                    const technologies = e.target.value
                                      .split(",")
                                      .map(tech => tech.trim())
                                      .filter(Boolean);
                                    field.onChange(technologies);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`projects.${index}.githubUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GitHub URL (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://github.com/user/repo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.liveUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Live URL (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://myproject.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(index)}
                          className="absolute top-2 right-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendProject({
                      id: `proj-${Date.now()}`,
                      title: "",
                      description: "",
                      technologies: [],
                      githubUrl: "",
                      liveUrl: ""
                    })}
                    className="flex items-center gap-2 w-full transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </FormSection>

                {/* Skills */}
                <FormSection title="Skills" description="Your technical and professional skills">
                  <div className="space-y-2">
                    {form.watch("skills")?.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={skill || ""}
                          onChange={(e) => {
                            const skills = [...(form.getValues("skills") || [])];
                            skills[index] = e.target.value;
                            form.setValue("skills", skills);
                          }}
                          placeholder="Enter a skill"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const skills = [...(form.getValues("skills") || [])];
                            skills.splice(index, 1);
                            form.setValue("skills", skills);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const skills = [...(form.getValues("skills") || []), ""];
                      form.setValue("skills", skills);
                    }}
                    className="flex items-center gap-2 w-full transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </Button>
                </FormSection>

                {/* Certifications */}
                <FormSection title="Certifications" description="Professional certifications and achievements">
                  <div className="space-y-2">
                    {form.watch("certifications")?.map((certification, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={certification || ""}
                          onChange={(e) => {
                            const certifications = [...(form.getValues("certifications") || [])];
                            certifications[index] = e.target.value;
                            form.setValue("certifications", certifications);
                          }}
                          placeholder="Enter certification name"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const certifications = [...(form.getValues("certifications") || [])];
                            certifications.splice(index, 1);
                            form.setValue("certifications", certifications);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const certifications = [...(form.getValues("certifications") || []), ""];
                      form.setValue("certifications", certifications);
                    }}
                    className="flex items-center gap-2 w-full transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                    Add Certification
                  </Button>
                </FormSection>

                {/* Social Links */}
                <FormSection title="Social Links" description="Your professional social media profiles">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="social.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>
              </form>
            </Form>
          </div>

          {/* Preview Panel */}
          <div className="h-full">
            <PreviewWindow files={generatedFiles} isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
}