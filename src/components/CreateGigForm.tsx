
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { gigTypes, locations } from "@/data/mockData";
import { DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";

const CreateGigForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    duration: "",
    requirements: "",
    payment_amount: "",
    payment_status: "pending",
    max_needed: "1",
    type: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real app, this would create a new gig
    alert("Gig posted successfully! (This is a demo)");
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Post a New Gig</DialogTitle>
        <DialogDescription>
          Fill out the details below to create a new gig opportunity.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Gig Title *</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="E.g., Event Photographer Needed"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Provide details about what the gig involves"
            required
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => handleSelectChange("location", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.slice(1).map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Gig Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {gigTypes.slice(1).map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input 
              id="date" 
              name="date" 
              type="date" 
              value={formData.date} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <Input 
              id="time" 
              name="time" 
              type="time" 
              value={formData.time} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration *</Label>
            <Input 
              id="duration" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="E.g., 3 hours, Flexible"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payment_amount">Payment Amount ($) *</Label>
            <Input 
              id="payment_amount" 
              name="payment_amount" 
              type="number" 
              min="0"
              value={formData.payment_amount} 
              onChange={handleChange} 
              placeholder="E.g., 50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max_needed">Number of People Needed *</Label>
            <Input 
              id="max_needed" 
              name="max_needed" 
              type="number" 
              min="1"
              value={formData.max_needed} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea 
            id="requirements" 
            name="requirements" 
            value={formData.requirements} 
            onChange={handleChange} 
            placeholder="Any specific skills or items needed for this gig"
            rows={2}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Payment Status *</Label>
          <RadioGroup 
            value={formData.payment_status} 
            onValueChange={(value) => handleSelectChange("payment_status", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="secured" id="secured" />
              <Label htmlFor="secured" className="font-normal flex items-center">
                <span className="bg-gig-secured text-white text-xs px-2 py-0.5 rounded mr-2">💰</span>
                Payment Secured (You've pre-paid)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="font-normal flex items-center">
                <span className="bg-gig-pending text-white text-xs px-2 py-0.5 rounded mr-2">⚠️</span>
                Payment Pending (Pay later)
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full bg-gig-purple hover:bg-gig-dark-purple">
          Post Gig
        </Button>
      </form>
    </div>
  );
};

export default CreateGigForm;
