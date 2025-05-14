# MAGE File Format Specification Standard
## Version 1.0.0 | March 2025

---

## Overview

The MAGE file format is a professional-grade standard for storing, processing, and analyzing multimodal data with a focus on AI-ready audio and visual content. The format is designed to meet the demands of high-end audio post-production, visual effects pipelines, and multimodal AI systems by providing a unified, hierarchical data structure with path-based access.

This specification document outlines the technical requirements, file structure, and implementation guidelines for the MAGE format, ensuring interoperability across platforms and applications.

---

## File Format Identifier

**File Extension**: `.mage`

**MIME Type**: `application/x-mage`

**Magic Number**: `MAGE` (ASCII, 4 bytes: `0x4D 0x41 0x47 0x45`)

---

## File Structure

### 1. Binary File Organization

The MAGE file format uses a segment-based binary file structure, consisting of a header followed by multiple data segments. Each segment contains a specific type of data and can be individually accessed and modified.

```
+--------------------+
| MAGE File Header   |
+--------------------+
| Segment Table      |
+--------------------+
| Path Lookup Table  |
+--------------------+
| Node Index         |
+--------------------+
| Node Data          |
+--------------------+
| Binary Data Blocks |
+--------------------+
| Cache/Index Data   |
+--------------------+
```

### 2. Header Structure

The MAGE file header is a fixed-size structure (128 bytes) that appears at the beginning of every file:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
Magic           | char[4]   | 4            | "MAGE" identifier
VersionMajor    | uint16    | 2            | Major version number
VersionMinor    | uint16    | 2            | Minor version number
VersionPatch    | uint16    | 2            | Patch version number
Flags           | uint32    | 4            | File flags (see below)
StorageMode     | uint8     | 1            | 0 = Cold, 1 = Hot
Compression     | uint8     | 1            | Compression algorithm (see below)
Reserved1       | uint16    | 2            | Reserved for future use
NodeCount       | uint64    | 8            | Total number of nodes
SegmentCount    | uint32    | 4            | Number of segments in the file
SegmentTableOffset | uint64 | 8            | Offset to segment table
IndexOffset     | uint64    | 8            | Offset to node index
PathTableOffset | uint64    | 8            | Offset to path lookup table
DataBlockOffset | uint64    | 8            | Offset to data blocks
Created         | int64     | 8            | Creation time (Unix timestamp)
Modified        | int64     | 8            | Last modification time (Unix timestamp)
Checksum        | byte[32]  | 32           | SHA-256 checksum of file (excluding this field)
Reserved2       | byte[24]  | 24           | Reserved for future use
```

#### Flag Bits

```
Bit Position | Flag Name           | Description
-------------|---------------------|-----------------------------------------------
0            | HasLargeData        | File contains large binary data blocks
1            | IsCompressed        | File contents are compressed
2            | HasCachedData       | Contains pre-computed cached data
3            | RequiresFastAccess  | Optimized for random access
4            | StrictValidation    | Enforces strict data validation
5            | CrossModalIndexed   | Has indexes for cross-modal queries
6            | HasEncryption       | Contains encrypted segments
7-31         | Reserved            | Reserved for future use
```

#### Compression Types

```
Value | Name                 | Description
------|----------------------|------------------------------------------
0     | None                 | No compression
1     | Deflate              | Standard deflate algorithm
2     | LZ4                  | LZ4 compression (fast)
3     | ZSTD                 | Zstandard compression
4     | BlockSpecific        | Each block uses its own optimal compression
5-255 | Reserved             | Reserved for future use
```

### 3. Segment Table

The segment table follows the header and lists all segments in the file:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
SegmentCount    | uint32    | 4            | Number of segments
Segments        | Segment[] | varies       | Array of segment descriptors
```

Each segment descriptor:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
Type            | uint16    | 2            | Segment type identifier
Flags           | uint16    | 2            | Segment-specific flags
Offset          | uint64    | 8            | Offset from start of file
Size            | uint64    | 8            | Size in bytes
Checksum        | byte[16]  | 16           | MD5 checksum of segment
```

### 4. Path Lookup Table

The path lookup table provides efficient path-based access to nodes:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
EntryCount      | uint32    | 4            | Number of path entries
PathEntries     | PathEntry[]| varies      | Array of path lookup entries
```

Each path entry:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
PathHash        | uint64    | 8            | Hash of the path string
PathOffset      | uint64    | 8            | Offset to the path string in string table
PathLength      | uint16    | 2            | Length of the path string
NodeId          | uint64    | 8            | ID of the node this path points to
```

### 5. Node Index

The node index contains the hierarchical structure of all nodes:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
NodeCount       | uint64    | 8            | Total number of nodes
Nodes           | NodeEntry[]| varies      | Array of node entries
```

Each node entry:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
NodeId          | uint64    | 8            | Unique node identifier
ParentId        | uint64    | 8            | Parent node ID (0 for root)
NameOffset      | uint64    | 8            | Offset to node name in string table
NameLength      | uint16    | 2            | Length of node name
DataType        | uint16    | 2            | Type of data in this node
DataOffset      | uint64    | 8            | Offset to node data
DataSize        | uint64    | 8            | Size of node data in bytes
ChildCount      | uint32    | 4            | Number of child nodes
FirstChildId    | uint64    | 8            | ID of first child (others sequential)
```

### 6. Binary Data Blocks

Large binary data is stored in separate blocks with their own compression scheme:

```
Field Name      | Type      | Size (bytes) | Description
----------------|-----------|--------------|--------------------------------------------------
BlockId         | uint64    | 8            | Unique block identifier
BlockType       | uint16    | 2            | Type of data in this block
Compression     | uint8     | 1            | Compression algorithm used
Flags           | uint8     | 1            | Block-specific flags
OriginalSize    | uint64    | 8            | Size before compression
StoredSize      | uint64    | 8            | Size after compression
DataOffset      | uint64    | 8            | Offset to actual data
Checksum        | byte[16]  | 16           | MD5 checksum of uncompressed data
```

---

## Storage Optimization Modes

MAGE files support two primary storage optimization modes:

### 1. Cold Storage Mode

Optimized for file size, long-term archiving, and transfer efficiency:

- Higher compression ratios using advanced algorithms
- Sequential data organization for better compression
- Reduced indexing overhead
- Deferred loading of large data blocks
- Optimized for write-once, read-many operations

### 2. Hot Storage Mode

Optimized for processing speed, random access, and real-time performance:

- Memory-mapped file access where supported
- Pre-computed indices for fast path lookup
- Optimized for random access patterns
- Caching of frequently accessed data
- Space-time trade-offs favoring processing speed
- Optional redundant data structures for faster access

Files can be converted between modes using the mode conversion tools without data loss.

---

## Data Types

### Basic Data Types

```
ID    | Type Name | Description
------|-----------|------------------------------------------------------
0x0000| None      | Container node with no direct data
0x0001| Text      | UTF-8 encoded text
0x0002| Number    | IEEE 754 double-precision floating point
0x0003| Integer   | 64-bit signed integer
0x0004| Boolean   | Boolean value (true/false)
0x0005| DateTime  | 64-bit UTC timestamp (nanoseconds since epoch)
0x0006| Binary    | Raw binary data
0x0007| Reference | Reference to another node
```

### Audio-Specific Data Types

```
ID    | Type Name        | Description
------|------------------|------------------------------------------------
0x0100| Audio            | Raw audio data
0x0101| AudioMetadata    | Audio format metadata
0x0102| Mel              | Mel spectrogram data
0x0103| MFCC             | Mel-frequency cepstral coefficients
0x0104| Onset            | Onset detection markers
0x0105| Pitch            | Pitch analysis data
0x0106| Spectrum         | Spectral analysis data
0x0107| Envelope         | Amplitude envelope
0x0108| Transient        | Transient detection points
0x0109| Timbre           | Timbre classification data
0x010A| Harmonic         | Harmonic content analysis
0x010B| Noise            | Noise profile data
0x010C| Marker           | Time-based markers
0x010D| Beat             | Beat and tempo analysis
0x010E| IRMask           | Impulse response mask
0x010F| SourceSeparation | Source separation data
0x0110| Dereverberation  | Dereverberation data
0x0111| VoicePrint       | Neural network voice fingerprint
0x0112| EQ               | Equalization curve data
0x0113| Dynamics         | Dynamic processing data
0x0114| SpatialAudio     | Spatial audio data (Atmos compatible)
0x0115| Automation       | Parameter automation data
```

### Video and Visual Data Types

```
ID    | Type Name        | Description
------|------------------|------------------------------------------------
0x0200| Video            | Raw video data
0x0201| VideoMetadata    | Video format metadata
0x0202| Image            | Still image data
0x0203| PoseKeypoints    | Body/hand/face keypoints
0x0204| SkeletonGraph    | Skeletal graph connections
0x0205| Landmarks        | Facial/object landmarks
0x0206| SegmentationMask | Object/person segmentation mask
0x0207| DepthMap         | Depth estimation data
0x0208| MotionVector     | Motion vector field
0x0209| OpticalFlow      | Optical flow data
0x020A| TrackingBox      | Object tracking bounding boxes
0x020B| SceneGraph       | Hierarchical scene description
0x020C| Gesture          | Gesture recognition data
0x020D| Emotion          | Emotion classification data
0x020E| Gaze             | Eye gaze tracking data
0x020F| HDRMetadata      | High dynamic range metadata
0x0210| ColorGrading     | Color grading information
```

### Container Data Types

```
ID    | Type Name        | Description
------|------------------|------------------------------------------------
0x0300| Timeline         | Audio/video timeline with regions
0x0301| Track            | Media track container
0x0302| Layer            | Video/effect layer
0x0303| List             | Ordered list of values
0x0304| Map              | Key-value mapping
0x0305| Graph            | Node-edge relationship structure
0x0306| Project          | Root project container
0x0307| Group            | Grouped elements container
0x0308| Take             | Recording take
0x0309| Composite        | Composited elements
```

---

## Path Syntax

MAGE files use a hierarchical path-based addressing system similar to file paths:

```
/project/tracks/vocal/audio                  # Access raw audio data
/project/tracks/vocal/features/mel           # Access mel spectrogram
/project/video/main/analysis/pose/timeline/0 # Access first frame of pose data
```

Special path syntax:

```
*                 # Wildcard matching any single node name
**                # Recursive wildcard matching any depth
[0-9]             # Range pattern matching
{option1,option2} # Alternative pattern matching
```

Query examples:

```
/project/tracks/*/audio                      # All audio nodes in all tracks
/project/**/mel                              # All mel spectrograms at any depth
/project/video/main/analysis/pose/timeline/* # All frames of pose data
```

---

## Integrity and Security

### Data Integrity

1. **File-level Integrity**
   - SHA-256 checksum of the entire file (excluding checksum field)
   - Version information for compatibility checking
   - Creation and modification timestamps

2. **Segment-level Integrity**
   - MD5 checksum for each segment
   - Size validation
   - Type validation

3. **Node-level Integrity**
   - Data type validation
   - Reference validation
   - Parent-child relationship validation

### Security Features

1. **Optional Encryption**
   - AES-256 encryption for sensitive segments
   - Key management metadata
   - Selective encryption of specific nodes

2. **Data Signing**
   - Optional digital signatures
   - Author attribution
   - Modification tracking

---

## Synchronization and Alignment

### Time-based Synchronization

1. **Global Timeline**
   - Master timeline with absolute timing
   - Frame-accurate synchronization points
   - Support for multiple timecode standards

2. **Cross-modal Alignment**
   - Alignment markers between audio and visual data
   - Cross-reference links between related nodes
   - Automatic synchronization validation

3. **Temporal Queries**
   - Query data across modalities by timestamp
   - Time range selections
   - Support for multiple timing references

---

## Performance Considerations

### Memory Efficiency

1. **Lazy Loading**
   - On-demand loading of large data blocks
   - Reference counting for shared data
   - Memory mapping for efficient access

2. **Caching Strategy**
   - LRU (Least Recently Used) cache for hot data
   - Precomputed indices for fast path lookups
   - Partial file loading

### Processing Optimization

1. **Parallel Processing Support**
   - Thread-safe data structures
   - Parallel segment loading
   - Atomic node operations

2. **Streaming Capabilities**
   - Support for incrementally building files
   - Streaming read access patterns
   - Append operations

---

## Compatibility and Interoperability

### Version Compatibility

1. **Forward Compatibility**
   - Unknown field handling
   - Graceful degradation for unsupported features
   - Strict vs. lenient parsing modes

2. **Backward Compatibility**
   - Version detection and adaptation
   - Deprecation warnings
   - Upgrade path documentation

### External Format Interoperability

1. **Import/Export**
   - Standard audio format conversion (WAV, MP3, FLAC)
   - Video format interoperability (MP4, ProRes, etc.)
   - Industry standard exchange formats

2. **Metadata Standards**
   - Support for ID3, Exif, XMP metadata
   - BWF (Broadcast Wave Format) compatibility
   - Dolby Atmos metadata mapping

---

## Implementation Requirements

### Minimum Implementation

To be compliant with the MAGE standard, implementations must support:

1. File header parsing and generation
2. Basic path-based read/write access
3. Cold storage mode loading
4. Basic data type support
5. File integrity validation
6. Standard error handling

### Full Implementation

A full implementation should also support:

1. Hot storage mode with optimization
2. All standard data types
3. Mode conversion
4. Advanced path query syntax
5. Lazy loading and memory mapping
6. Parallel processing capabilities
7. Security features
8. All integrity validation levels

---

## Extension Mechanism

### Custom Data Types

1. **Registration Process**
   - Type ID allocation (0x8000-0xFFFF reserved for custom types)
   - Metadata requirements
   - Validation protocols

2. **Vendor-specific Extensions**
   - Namespacing guidelines
   - Documentation requirements
   - Compatibility guidelines

### Plugin Architecture

1. **Processing Plugins**
   - Interface specifications
   - Life-cycle management
   - Resource allocation guidelines

2. **Format Extensions**
   - New segment type registration
   - Header extension mechanism
   - Compatibility declaration

---

## Network-Based Access and Distribution

### Remote Data Access

1. **Network Path Syntax**
   - Protocol-based path references (`http://`, `https://`, `s3://`, etc.)
   - Support for authentication tokens and credentials
   - URI query parameters for selective data loading

2. **Partial Loading**
   - Ability to load specific paths without downloading entire file
   - Selective branching of the hierarchical structure
   - Range requests for efficient network utilization

3. **Streaming Protocol**
   - Support for real-time streaming of MAGE data
   - Chunked transfer for large datasets
   - Resumable downloads for interrupted transfers

### Multi-Layer Caching

1. **Cache Strategies**
   - Memory-only caching for speed-critical operations
   - Disk caching for persistent storage
   - Combined memory and disk caching
   - No-caching option for minimal resource usage

2. **Cache Management**
   - Time-to-live (TTL) configuration for cached items
   - Size-based cache limiting
   - Least-recently-used (LRU) eviction policy
   - Manual cache invalidation mechanisms

3. **Distributed Caching**
   - Support for shared caches in collaborative environments
   - Cache synchronization protocols
   - Cache integrity verification

### Network Resilience

1. **Retry Strategies**
   - Exponential backoff for failed requests
   - Configurable retry limits
   - Circuit breaker pattern for persistent failures

2. **Failover Mechanisms**
   - Multiple mirror support
   - Alternative endpoint configuration
   - Transparent failover without application interruption

3. **Bandwidth Adaptation**
   - Quality of service monitoring
   - Dynamic resolution adjustment
   - Prioritized loading of critical path elements

---

## Error Handling

### Error Categories

1. **Structural Errors**
   - Invalid file header
   - Corrupt segment table
   - Checksum failure

2. **Data Errors**
   - Type mismatch
   - Reference to non-existent node
   - Invalid data format

3. **Access Errors**
   - Path not found
   - Permission denied
   - Resource unavailable

### Error Reporting

1. **Error Codes**
   - Standardized error code system
   - Category and specific error identification
   - Severity levels

2. **Recovery Strategies**
   - Partial file recovery guidelines
   - Graceful degradation approaches
   - Data salvage procedures

---

## Appendix

### A. Example File Layout

```
Offset | Size   | Description
-------|--------|--------------------------------------------------
0x0000 | 128    | MAGE File Header
0x0080 | 512    | Segment Table (variable size)
0x0280 | 2048   | Path Lookup Table (variable size)
0x0A80 | 4096   | Node Index (variable size)
0x1A80 | varies | Node Data (strings, small values)
varies | varies | Binary Data Blocks (large data)
varies | varies | Cache/Index Data (Hot mode only)
```

### B. Standard Profiles

1. **Audio Post-Production Profile**
   - Required data types
   - Standard path structure
   - Recommended storage patterns

2. **Visual Effects Profile**
   - Visual data organization
   - Animation data structures
   - Rendering metadata

3. **AI Training Profile**
   - Feature vector organization
   - Batching recommendations
   - Label storage guidelines

### C. Reference Implementations

1. **Core Library**
   - Reference code repository location
   - Language bindings
   - Example implementations

2. **Validation Tools**
   - Official validator
   - Format conversion utilities
   - Debugging guidelines

---

## Changelog

### Version 1.0.0 (March 2025)
- Initial release of the MAGE file format specification
- Defined core file structure and data types
- Established storage optimization modes
- Specified path-based access system

---

Copyright © 2025 | MAGE Format Specification Working Group | All Rights Reserved