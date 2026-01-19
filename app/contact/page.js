"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values) {
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    console.log(values);
    form.reset();
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Get in Touch</h1>
              <p className="text-lg text-muted-foreground mb-12">
                Have a project in mind? Reach out to our team for a free consultation and quote.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Head Office</h3>
                    <p className="text-muted-foreground">123 Industrial Avenue, Tech Park<br/>New City, State 54321</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm">Mon-Fri 9am-6pm</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Email</h3>
                    <p className="text-muted-foreground">sales@roofy.com</p>
                    <p className="text-muted-foreground">support@roofy.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border/50"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="h-12 bg-secondary/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} className="h-12 bg-secondary/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} className="h-12 bg-secondary/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your project requirements..." className="min-h-[150px] bg-secondary/20 resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold rounded-xl">
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
