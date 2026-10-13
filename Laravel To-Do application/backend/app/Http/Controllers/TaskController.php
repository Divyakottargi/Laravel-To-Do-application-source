<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'filter' => ['nullable', Rule::in(['all', 'completed', 'pending'])],
        ]);

        $query = $request->user()->tasks()->latest();
        $filter = $request->query('filter', 'all');

        if ($filter === 'completed') {
            $query->where('status', 'Done');
        } elseif ($filter === 'pending') {
            $query->where('status', '!=', 'Done');
        }

        return response()->json([
            'message' => 'Tasks retrieved successfully',
            'data' => $query->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['To Do', 'In Progress', 'Done'])],
            'due_date' => ['nullable', 'date'],
        ]);

        $task = $request->user()->tasks()->create($validated);

        return response()->json([
            'message' => 'Task created successfully',
            'data' => $task,
        ], 201);
    }

    public function show(Request $request, Task $task): JsonResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        return response()->json([
            'message' => 'Task retrieved successfully',
            'data' => $task,
        ]);
    }

    public function update(Request $request, Task $task): JsonResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['To Do', 'In Progress', 'Done'])],
            'due_date' => ['nullable', 'date'],
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => $task->fresh(),
        ]);
    }

    public function destroy(Request $request, Task $task): JsonResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
