'use client';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Question } from '@/lib/types';
import {
  GripVertical,
  Plus,
  Save,
  Trash2,
  Eye,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AssessmentBuilderPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: `q-${Date.now()}`, type: 'text', text: '' },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };
  
  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...questions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newQuestions.length) {
      const temp = newQuestions[index];
      newQuestions[index] = newQuestions[newIndex];
      newQuestions[newIndex] = temp;
      setQuestions(newQuestions);
    }
  };

  const updateQuestion = (id: string, updatedField: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updatedField } : q))
    );
  };

  const QuestionPreview = ({ question }: { question: Question }) => {
    return (
      <div className="space-y-4">
        <Label className="font-semibold">{question.text || 'Question Preview'}</Label>
        {question.type === 'text' && (
          <Textarea placeholder="Candidate's answer" readOnly />
        )}
        {question.type === 'code' && (
          <div className="font-mono rounded-md border bg-muted p-4 text-sm text-muted-foreground">
            // Candidate writes code here
          </div>
        )}
        {question.type === 'multiple-choice' && (
          <RadioGroup>
            {(question.options || ['Option 1', 'Option 2']).map(
              (option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              )
            )}
          </RadioGroup>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Assessment Builder" />
      <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8">
        {/* Builder Section */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Frontend Skills Challenge"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A short description of the assessment."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {questions.map((q, index) => (
            <Card key={q.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  Question {index + 1}
                </CardTitle>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveQuestion(index, 'up')} disabled={index === 0}>
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveQuestion(index, 'down')} disabled={index === questions.length - 1}>
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeQuestion(q.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select
                    value={q.type}
                    onValueChange={(type: 'text' | 'code' | 'multiple-choice') =>
                      updateQuestion(q.id, { type })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="code">Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    placeholder="e.g., What is the difference between `let` and `const`?"
                    value={q.text}
                    onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                  />
                </div>
                {q.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    <Label>Options (comma-separated)</Label>
                    <Input
                      placeholder="Option A, Option B, Option C"
                      value={q.options?.join(', ') || ''}
                      onChange={(e) =>
                        updateQuestion(q.id, {
                          options: e.target.value.split(',').map(o => o.trim()),
                        })
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col gap-6">
          <Card className="sticky top-20">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Live Preview</CardTitle>
              </div>
               <Button>
                <Save className="mr-2 h-4 w-4" /> Save Assessment
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{title || 'Assessment Title'}</h2>
                <p className="text-muted-foreground">
                  {description || 'Assessment description will appear here.'}
                </p>
              </div>
              <div className="space-y-8">
                {questions.map((q, i) => (
                  <div key={q.id}>
                    <p className="font-medium mb-2">Question {i + 1}</p>
                    <QuestionPreview question={q} />
                  </div>
                ))}
                 {questions.length === 0 && (
                  <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>Add questions to see the preview.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
