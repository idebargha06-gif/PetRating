# 📚 Day 3 - Quick Reference Card

## 🎯 Files to Create (6 Total)

### Frontend
1. **components/pet/PetUploadForm.tsx** - Upload component with dropzone
2. **app/rate-pet/page.tsx** - Upload page

### Backend
3. **app/api/pets/upload/route.ts** - File upload API endpoint

### Database
4. **Supabase SQL** - Create pets table

### Updates
5. **app/page.tsx** - Add "Rate Pet" button to nav
6. **.gitignore** - Ignore uploads folder

---

## 🚀 Implementation Checklist

- [ ] Create PetUploadForm component
  - [ ] Import react-dropzone
  - [ ] Handle file selection
  - [ ] Show preview
  - [ ] Form validation

- [ ] Create upload API endpoint
  - [ ] Validate session
  - [ ] Save file to public/uploads/
  - [ ] Save metadata to Supabase
  - [ ] Return success response

- [ ] Create Supabase schema
  - [ ] Run SQL to create pets table
  - [ ] Add RLS policies

- [ ] Create rate-pet page
  - [ ] Import PetUploadForm
  - [ ] Add authentication guard
  - [ ] Style layout

- [ ] Update homepage
  - [ ] Add "Rate Pet" button
  - [ ] Show when authenticated

- [ ] Update .gitignore
  - [ ] Add public/uploads/
  - [ ] Add image extensions

- [ ] Test upload flow
  - [ ] Can select photo
  - [ ] Preview shows
  - [ ] Can enter pet details
  - [ ] Can submit form
  - [ ] File saved
  - [ ] Database updated
  - [ ] Redirect works

---

## 📊 Code Structure

```
UPLOAD FLOW:
User Input
  ↓ [Frontend]
PetUploadForm (drag-drop, validation, preview)
  ↓
Form Submit
  ↓ [Network]
/api/pets/upload (POST)
  ↓ [Backend]
Save File (public/uploads/)
  ↓
Save Metadata (Supabase pets table)
  ↓
Return Response
  ↓ [Frontend]
Success Message
  ↓
Redirect to /pet/[petId]
```

---

## 🔧 Key Code Patterns

### React Dropzone Setup
```typescript
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
  maxFiles: 1
});
```

### File Validation
```typescript
if (!file.type.startsWith('image/')) {
  setError('Must be image');
}
if (file.size > 5 * 1024 * 1024) {
  setError('Max 5MB');
}
```

### Multipart Form Submit
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('petName', petName);
await axios.post('/api/pets/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### API Session Check
```typescript
const session = await getServerSession();
if (!session?.user?.email) {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
```

### Supabase Insert
```typescript
const { data, error } = await supabase
  .from('pets')
  .insert({ user_id, name, breed, type, photo_url })
  .select();
```

---

## ⚠️ Common Gotchas

| Gotcha | Solution |
|--------|----------|
| react-dropzone not installed | Run `npm install` |
| Can't create public/uploads | Code creates it automatically |
| Files not saving | Check node write permissions |
| Database insert fails | Check SUPABASE_SERVICE_ROLE_KEY set |
| 401 error | Check NextAuth session active |
| CORS issues | Supabase should handle it |
| Preview not showing | Check FileReader API support |
| Upload hangs | Check file size < 5MB |

---

## 🧪 Test Cases

After implementation, verify:

| Test | Expected | Status |
|------|----------|--------|
| Visit /rate-pet when not logged in | Redirects to /login | ☐ |
| Upload form loads | All fields visible | ☐ |
| Drag image to drop zone | Preview appears | ☐ |
| Select image via click | Preview appears | ☐ |
| Upload non-image file | Error message | ☐ |
| Upload >5MB file | Error message | ☐ |
| Submit without pet name | Error message | ☐ |
| Submit valid form | Success message | ☐ |
| Check public/uploads | Image file exists | ☐ |
| Query Supabase pets table | Record exists | ☐ |
| Check pet metadata | Correct values | ☐ |
| Follow redirect | Goes to /pet/[id] | ☐ |

---

## 📊 Success Metrics

Day 3 is complete when:

```
✅ Component creation:
   - PetUploadForm works
   - rate-pet page loads
   - Homepage button appears

✅ API functionality:
   - POST /api/pets/upload responds
   - Files save to disk
   - Metadata saves to DB

✅ User flow:
   - Can drag-drop images
   - Can enter pet details
   - Upload succeeds
   - Redirects correctly

✅ Testing:
   - No console errors
   - All validations work
   - Database queries succeed
   - Files accessible

✅ Code quality:
   - No unused imports
   - Proper error handling
   - TypeScript types correct
   - Code is readable
```

---

## 📋 Path Selection Matrix

| Criteria | Path A | Path B | Path C |
|----------|--------|--------|--------|
| Time | 1-2h | 20-30m | 10-15m |
| Learning | High | Medium | Low |
| Experience | All | Intermediate+ | Advanced+ |
| Best For | First-time | Experienced | Busy |
| Understanding | Deep | Good | None |
| Risk | Low | Low | Low |

---

## 🎓 Learning Objectives

By the end of Day 3, understand:

- [ ] How browser file APIs work (FileReader, Blob)
- [ ] React hooks for file upload (useState, useCallback)
- [ ] react-dropzone library usage
- [ ] HTML5 drag-drop events
- [ ] Form data encoding (multipart/form-data)
- [ ] Next.js file upload handling
- [ ] Server-side file system operations
- [ ] Database design for file relationships
- [ ] Client/server validation patterns
- [ ] Session validation in APIs

---

## 📞 Reference URLs

| Resource | URL |
|----------|-----|
| React Dropzone | https://react-dropzone.js.org |
| Next.js File Upload | https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body |
| Supabase SQL | https://supabase.com/docs/guides/database |
| MDN File API | https://developer.mozilla.org/en-US/docs/Web/API/File |
| Drag & Drop API | https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API |

---

## ⏱️ Time Breakdown (Path B - 30 mins)

- Setup & read: 5 mins
- Create Supabase schema: 2 mins
- Create components: 8 mins
- Create API endpoint: 5 mins
- Update files: 3 mins
- Test & verify: 7 mins

---

## 🎬 Next Steps After Day 3

When Day 3 is complete:

1. Update SQL status: `UPDATE todos SET status = 'done' WHERE id = 'p1-day3-upload';`
2. Read Day 4 guide: OpenAI Vision Integration
3. Start Day 4 (the critical feature)

---

**Phase 1, Day 3**  
**Ready to start:** Yes  
**Choose your path:** A / B / C  
**Good luck! 🚀**
